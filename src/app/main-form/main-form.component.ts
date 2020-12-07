import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import * as data from 'src/app/cut_down_header.json';
import * as mergeSorter from 'src/app/mergesort.js';
import * as quickSorter from 'src/app/quicksort.js'

//stats interface to store all output stats
interface stats {
  time: number,
  leftSide: number,
  rightSide: number,
  dayTime: number,
  nightTime: number,
  tempMean: number,
  presMean: number,
  visMean: number,
  windDirection: String
}
//Main Driver Component for the Application//
@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss']
})
export class MainFormComponent implements OnInit {

  //Definitions being initialized
  searchForm: FormGroup;
  submitted = false;
  success = false;
  list: any;
  stats: stats = {
    time: 0,
    leftSide: 0,
    rightSide: 0,
    dayTime: 0,
    nightTime: 0,
    tempMean: 0,
    presMean: 0,
    visMean: 0,
    windDirection: ''
  };

  //lists for selection dropdowns
  sortList: any = ['MergeSort', 'QuickSort']
  stateList: any = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'WV'];
  timeList: any = ['Day', 'Night'];
  weatherList: any = ['Clear', 'Haze', 'Drizzle', 'Light Rain', 'Rain', 'Heavy Rain', 'Scattered Clouds', 'Partly Cloudy', 'Mostly Cloudy', 'Overcast', 'Light Snow', 'Snow', 'Light Freezing Drizzle', 'Fog', 'Patches of Fog', 'Light Freezing Fog', 'Shallow Fog'];

  //configurations for sliders
  options1: Options = {
    floor: 1,
    ceil: 4,
    step: 1
  };
  options2: Options = {
    floor: 1,
    ceil: 10,
    step: 1
  };
  options3: Options = {
    floor: -120,
    ceil: 120,
    step: 1
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      sortType: ['', Validators.required],
      state: [''],
      date: [''],
      visibility: new FormControl([1, 10]),
      temperature: new FormControl([-120, 120]),
      time: [''],
      weather: [''],
      severity: new FormControl([1, 4])
    });
  }

  /**
   * Event Handler for form submission
   */
  onSubmit() {
    this.submitted = true;

    //calls validators
    if (this.searchForm.invalid) {
      return;
    }
    else { //if valid, executes code
      this.success = true;
      this.generateSearch();
      this.generateStatistics();
    }
  }

  changeState(e) { //eventHandler for changing state selection
    this.searchForm.controls.state.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeTime(e) {//eventHandler for changing time selection
    this.searchForm.controls.time.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeWeather(e) {//eventHandler for changing weather selection
    this.searchForm.controls.weather.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeSortType(e) {//eventHandler for changing sorting selection
    this.searchForm.controls.sortType.setValue(e.target.value, {
      onlySelf: true
    })
  }

  /**
   * Main driver code, calls all sorting functions, applies filters and generates report statistics.
   */
  generateSearch() {
    const mS: Boolean = this.searchForm.controls.sortType.value == '1: MergeSort';
    this.list = data;
    this.list = this.list.default;
    var start = Date.now();

    //calls sort and filter on date
    if (this.searchForm.controls.date.value != '') {
      console.log(this.list);
      if (mS) {
        this.list = mergeSorter.mergeSort(this.list, 'date');
      }
      else{
        quickSorter.quickSortIterative(this.list,'date');
      }
      console.log(this.list);
      //list = fede'sfunction(tlist);his.searchForm.controls.date.value,
    }

    //calls sort and filter on state
    if (this.searchForm.controls.state.value != '') {
      console.log(this.list);
      if (mS) {
        this.list = mergeSorter.mergeSort(this.list, 'state');
      }
      else{
        quickSorter.quickSortIterative(this.list,'state');
      }
      console.log(this.list);
      //list = fede'sfunction(this.searchForm.controls.state.value,list);
    }

    //calls sort and filter on time
    if (this.searchForm.controls.time.value != '') {
      console.log(this.list);
      if (mS) {
        this.list = mergeSorter.mergeSort(this.list, 'time');
      }
      else{
        quickSorter.quickSortIterative(this.list,'time');
      }
      console.log(this.list);
      //list = fede'sfunction(this.searchForm.controls.time.value,list);
    }

    //calls sort and filter on weather
    if (this.searchForm.controls.weather.value != '') {
      console.log(this.list);
      if (mS) {
        this.list = mergeSorter.mergeSort(this.list, 'weather');
      }
      else{
        quickSorter.quickSortIterative(this.list,'weather');
      }
      console.log(this.list);
      //list = fede'sfunction(this.searchForm.controls.weather.value,list);
    }

    //calls sort and filter on severity
    if (this.searchForm.controls.severity.value[0] != 1 || this.searchForm.controls.severity.value[1] != 4) {
      console.log(this.list);
      if (mS) {
        this.list = mergeSorter.mergeSort(this.list, 'severity');
      }
      else{
        quickSorter.quickSortIterative(this.list,'severity');
      }
      console.log(this.list);
      //list = fede'sfunction(this.searchForm.controls.severity.value,list);
    }

    //calls sort and filter on visibility
    if (this.searchForm.controls.visibility.value[0] != 1 || this.searchForm.controls.visibility.value[1] != 10) {
      console.log(this.list);
      if (mS) {
        this.list = mergeSorter.mergeSort(this.list, 'visibility');
      }
      else{
        quickSorter.quickSortIterative(this.list,'visibility');
      }
      console.log(this.list);
      //list = fede'sfunction(this.searchForm.controls.visibility.value,list);
    }

    //calls sort and filter on temperature
    if (this.searchForm.controls.temperature.value[0] != -120 || this.searchForm.controls.temperature.value[1] != 120) {
      console.log(this.list);
      if (mS) {
        this.list = mergeSorter.mergeSort(this.list, 'temperature');
      }
      else{
        quickSorter.quickSortIterative(this.list,'temperature');
      }
      console.log(this.list);
      //list = fede'sfunction(this.searchForm.controls.temperature.value,list);
    }
    var end = Date.now();
    this.stats.time = end - start;
  }

  /**
   * Generates all query statistics
   */
  generateStatistics() {
    let leftCounter: number = 0;
    let dayCounter: number = 0;
    let tempTotal: number = 0;
    let presTotal: number = 0;
    let visTotal: number = 0;


    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].Side == 'L') {
        leftCounter++; //accumulator for left/right side crashes
      }
      if (this.list[i].Time == 'Day') {
        dayCounter++; //accumulator for day/night side crashes
      }
      tempTotal += +this.list[i].Temp;//accumulator for temp
      presTotal += +this.list[i].Pres;//accumulator for pressure
      visTotal += +this.list[i].Vis;//accumulator for visibility
    }

    //pushes all to our statistics object
    this.stats.leftSide = +(leftCounter / this.list.length * 100).toFixed(2);
    this.stats.rightSide = 100 - this.stats.leftSide;
    this.stats.dayTime = +(dayCounter / this.list.length * 100).toFixed(2);
    this.stats.nightTime = 100 - this.stats.dayTime;
    this.stats.tempMean = +(tempTotal / this.list.length).toFixed(2);
    this.stats.presMean = +(presTotal / this.list.length).toFixed(2);
    this.stats.visMean = +(visTotal / this.list.length).toFixed(2);

  }
  numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

}

