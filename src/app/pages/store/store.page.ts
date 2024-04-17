import { Component, OnInit, } from '@angular/core';
import { DxDataGridModule, DxButtonModule, DxTemplateModule, DxFormModule, DxPopupModule, DxRadioGroupModule } from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-store',
  standalone: true,
  imports: [DxDataGridModule, HttpClientModule, DxButtonModule, DxTemplateModule, DxFormModule, DxPopupModule, DxRadioGroupModule, CommonModule ],
  templateUrl: './store.page.html',
  styleUrl: './store.page.css'
})
export class StorePage {
  itemData: any[] = [];
  private itemListSubscription: ReturnType<typeof setInterval> | undefined;
  createPopVis = false;
  singleItemData: any = {};
  isPopupVisible = false;
  isPopupVisibleDel = false;
  isPopupVisibleView = false;


  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Call getItemList() immediately when the component initializes
    this.getItemList();

    // Set up interval to call getItemList() every 10 seconds
    this.itemListSubscription = setInterval(() => {
      this.getItemList();
    }, 5000);
  }

  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    if (this.itemListSubscription) {
      clearInterval(this.itemListSubscription);
    }
  }


  getItemList() {
    let apiUrl = 'https://crowd9-platform-api.azurewebsites.net/api/TempService/GeItemList';

    this.http.post<any>(apiUrl, {}).subscribe({
      next: (response) => {
        this.itemData = response.items;
        console.log(this.itemData);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

editItem(data: any) {
  // Extract the relevant information from the data parameter
  const { id, manufacturer, model, imageURL, information } = data.data;
  
  // Prepare the data object in the required format
  this.singleItemData = {
    id: id,
    manufacturer: manufacturer,
    model: model,
    imageURL: imageURL,
    information: information
  };

  // Open the popup for editing
  this.isPopupVisible = true;
}

viewItem(data: any){
  // Extract the relevant information from the data parameter
  const { id, manufacturer, model, imageURL, information } = data.data;
  
  // Prepare the data object in the required format
  this.singleItemData = {
    id: id,
    manufacturer: manufacturer,
    model: model,
    imageURL: imageURL,
    information: information
  };

  // Open the popup for editing
  this.isPopupVisibleView = true;

}

saveItem() {
  // Send the edited item data to the API endpoint
  let apiUrl = 'https://crowd9-platform-api.azurewebsites.net/api/TempService/WriteItem';
  this.http.post<any>(apiUrl, this.singleItemData).subscribe({
    next: response => {
      console.log('Edit successful:', response);
      // Optionally, you can handle UI changes or feedback here
    },
    error: error => {
      console.error('Error editing item:', error);
      // Optionally, you can handle error feedback here
    }
  });

  // Close the popup after saving
  this.getItemList();
  this.isPopupVisible = false;
  this.getItemList();
}

resetFormData() {
  this.singleItemData = {}; // Assuming singleItemData is an object representing form data
}

cancelEdit() {
  this.isPopupVisible = false; // Close the popup
}

openCreatePopup() {
  this.resetFormData();
  this.createPopVis = true;
}

cancelCreate() {
  // Reset the form data and close the popup
  this.resetFormData();
  this.singleItemData = {};
  this.createPopVis = false;
}

removeItem(itemId: string) {
  let apiUrl = 'https://crowd9-platform-api.azurewebsites.net/api/TempService/RemoveItem';

  this.http.post<any>(apiUrl, { id: itemId }).subscribe({
    next: (response) => {
      // Handle successful removal (if needed)
      console.log('Item removed successfully:', response);
      // Optionally, you can update your itemData array here to reflect the removal
    },
    error: (error) => {
      console.error('Error removing item:', error);
    }
  });
  this.isPopupVisibleDel = true;
}

createItem() {
  let apiUrl = 'https://crowd9-platform-api.azurewebsites.net/api/TempService/WriteItem';

  // Assuming singleItemData contains the form data
  this.http.post<any>(apiUrl, this.singleItemData).subscribe({
    next: (response) => {
      // Handle successful item creation
      console.log('New item created successfully:', response);
      // Optionally, you can update your itemData array here to reflect the new item
      // Reset the form data and close the popup
      this.singleItemData = {};
      this.createPopVis = false;
    },
    error: (error) => {
      console.error('Error creating new item:', error);
    }
  });
}

viewModes = [
  { text: 'Grid View', value: 'grid'},
  { text: 'Card View', value: 'card'}

];

currentView = 'grid';

onViewChange(value: string){
  this.currentView =value;
}
}
