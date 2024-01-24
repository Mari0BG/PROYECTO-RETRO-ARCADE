import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyService } from 'src/app/services/buy.service';
import { Cart } from 'src/app/models/cart';
import { UserService } from 'src/app/services/user.service';
import { forkJoin, of } from 'rxjs';
import { switchMap, map, catchError, filter } from 'rxjs/operators';

@Component({
  selector: 'app-client-ranking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-ranking.component.html',
  styleUrls: ['./client-ranking.component.css']
})
export class ClientRankingComponent implements OnInit {
  purchases: { product: String, quantity: number }[] = [];
  purchase: Cart[] = [];
  userRanking: { userId: string; purchaseCount: { name: string; count: number }; }[] = [];

  constructor(public buyservice: BuyService, public userService: UserService) {}

  ngOnInit(): void {
    this.buyservice.getAllCarts().pipe(
      switchMap((res: any) => {
        this.purchase = res as Cart[];
        const observables = this.purchase.map(cart => {
          const userId = cart._idClient;
          return this.userService.getUserById(userId).pipe(
            catchError(error => {
              console.error(`Error fetching user for userId ${userId}:`, error);
              return of(null); // Return a placeholder value on error
            })
          );
        });

        return forkJoin(observables).pipe(
          filter(users => users.every(user => user !== null)) // Filter out null values
        );
      }),
      map((users: any[]) => {
        const userPurchaseCount: { [userId: string]: { name: string; count: number } } = {};
      
        users.forEach((userResponse: any, index: number) => {
          const user = userResponse.data; // Acceder a la propiedad data
          const userName = user ? user.name : 'Usuario Desconocido';
          const userId = this.purchase[index]._idClient;
      
          console.log('userName', userName);
      
          if (!userPurchaseCount[userId]) {
            userPurchaseCount[userId] = { name: userName as string, count: 1 };
          } else {
            userPurchaseCount[userId].count++;
          }
        });
      
        console.log('userPurchaseCount', userPurchaseCount);
      
        this.userRanking = Object.keys(userPurchaseCount).map(userId => ({
          userId,
          purchaseCount: userPurchaseCount[userId]
        }));
      
        this.userRanking.sort((a, b) => b.purchaseCount.count - a.purchaseCount.count);
      })
    ).subscribe();
  }

  getRankingClass(position: number): string {
    switch (position) {
      case 1:
        return 'bg-yellow-500 text-white rounded-full p-2 text-xs mr-2';
      case 2:
        return 'bg-gray-300 text-gray-700 rounded-full p-2 text-xs mr-2';
      case 3:
        return 'bg-amber-800 text-white rounded-full p-2 text-xs mr-2';
      default:
        return 'bg-gray-500 text-white rounded-full p-2 text-xs mr-2';
    }
  }
}
