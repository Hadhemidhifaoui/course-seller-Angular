import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/models/purchase.model';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-achat',
  templateUrl: './achat.component.html',
  styleUrls: ['./achat.component.css']
})
export class AchatComponent implements OnInit {
  purchases: Purchase[] = [];

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.loadPurchases();
  }

  loadPurchases(): void {
    this.purchaseService.getAllPurchases().subscribe(
      (data) => {
        this.purchases = data;
        this.enrichPurchaseDetails(); 
      },
      (error) => {
        console.error('Error fetching purchases', error);
      }
    );
  }

  enrichPurchaseDetails(): void {
    this.purchases.forEach(purchase => {
      this.purchaseService.getUserById(purchase.userId).subscribe(
        (userDetails) => {
      
          purchase.userDetails = userDetails;
        },
        (error) => {
          console.error('Error fetching user details', error);
        }
      );

      this.purchaseService.getCourseById(purchase.courseId).subscribe(
        (courseDetails) => {
     
          purchase.courseDetails = courseDetails;
        },
        (error) => {
          console.error('Error fetching course details', error);
        }
      );
    });
  }
}
