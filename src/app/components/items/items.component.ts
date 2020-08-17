import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/Item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  click: boolean = false;
  items: Item[];
  editState: boolean = false;
  itemToEdit: Item;
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => {
      //console.log(items);
      this.items = items;
    });
  }

  deleteItem(event, item: Item){
    this.clearState();
    this.itemService.deleteItem(item);
    this.click = false;
  }

  editItem(event, item: Item){
    this.editState = true;
    this.itemToEdit = item;
    this.click = !this.click;
  }

  updateItem(item: Item){
    this.itemService.updateItem(item);
    this.click = false;
    this.clearState();
  }

  clearState(){
    this.editState = false;
    this.itemToEdit = null;
    this.click = false;
    console.log(this.itemToEdit);
  }

}
