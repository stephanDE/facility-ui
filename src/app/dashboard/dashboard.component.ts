import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DashboardService } from './dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  roomForm = new FormGroup({
    flatId: new FormControl(''),
    roomName: new FormControl(''),
  });

  flatForm = new FormGroup({
    floorId: new FormControl(''),
    flatName: new FormControl(''),
  });

  floorForm = new FormGroup({
    facilityId: new FormControl(''),
    floorName: new FormControl(''),
  });

  facilityForm = new FormGroup({
    address: new FormControl('')
  });

  public facilites: any;
  selectedFacility: any;

  public floors: any;
  selectedFloor: any;

  public flats: any;
  selectedFlat: any;

  public rooms: any;
  selectedRoom: any;
  
  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.loadFacilites();
    this.loadFloors();
    this.loadFlats();
    this.loadRooms();
  }

  selectFacility(facility) {
    this.selectedFacility = facility;
    this.selectedFloor = null;
    this.selectedFlat = null;
    this.selectedRoom = null;
    this.floorForm.patchValue({
      facilityId: this.selectedFacility._id
    })
    this.flatForm.patchValue({
      floorId: ''
    })
    this.roomForm.patchValue({
      flatId: ''
    })
  }

  facilityBtnLoading: boolean;
  floorBtnLoading: boolean;
  flatBtnLoading: boolean;
  roomBtnLoading: boolean;


  selectFloor(floor) {
    this.selectedFloor = floor;
    this.selectedFlat = null;
    this.selectedRoom = null;
    this.flatForm.patchValue({
      floorId: this.selectedFloor._id
    });
    this.roomForm.patchValue({
      flatId: ''
    })
  }

  selectFlat(flat) {
    this.selectedFlat = flat;
    this.selectedRoom = null;
    this.roomForm.patchValue({
      flatId: this.selectedFlat._id
    })
  }

  selectRoom(room) {
    this.selectedRoom = room;
  }

  loadFacilites() {
    return this.dashboardService.getFacilities().subscribe(r => {
      this.facilites = r;
    });
  }

  loadFloors() {
    return this.dashboardService.getFloors().subscribe(r => {
      this.floors = r;
    });
  }

  loadFlats() {
    return this.dashboardService.getFlats().subscribe(r => {
      this.flats = r;
    });
  }


  loadRooms() {
    return this.dashboardService.getRooms().subscribe(r => {
      this.rooms = r;
    });
  }

  createFacility() {
    this.facilityBtnLoading = true;
    this.dashboardService.createFacility(this.facilityForm.value).subscribe(r => {
      this.facilityBtnLoading = false;
      this.loadFacilites();
    });
  }

  createFloor() {
    this.floorBtnLoading = true;
    this.dashboardService.createFloor(this.floorForm.value).subscribe(r => {
      this.floorBtnLoading = false;
      this.loadFloors();
    });
  }

  createFlat() {
    this.flatBtnLoading = true;
    this.dashboardService.createFlat(this.flatForm.value).subscribe(r => {
      this.flatBtnLoading = false;
      this.loadFlats();
    });
  }

  createRoom() {
    this.roomBtnLoading = true;
    this.dashboardService.createRoom(this.roomForm.value).subscribe(r => {
      this.roomBtnLoading = false;
      this.loadRooms();
    });
  }
}
