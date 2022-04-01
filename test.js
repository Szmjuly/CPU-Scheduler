import './style.css'

class Process{
  constructor(name, arrivalTime, burstTime, ioTime, ){
    this.name = name;

    this.index = 0;
    this.percentage = 0;

    this.times = {
      "Arrival": [arrivalTime],
      "Burst": [burstTime],
      "IO": [ioTime],
    }

    this.stats = {
      "TotalTime": 0,
      "IOTime": 0,
      "WaitTime": 0,
      "ResponseTime": 0,
    }
  }

  _run(){
    this.index++;
    this.percentage = Math.floor((this.index/this.burstTime)*100);
    console.log(this.name + " " + this.percentage + "% \r");
  }
}

/**
 * FCFS Scheduler (First Come First Serve)
 *  -The most basic and simplest of the algorithms.
 *  -When running it completes each task / process in the order 
 *    in which they arrived in.
 *  -All that matters for the process is its burst time as the next
 *    process comes onto the cpu when the previous is finished
 *    *ie. shifted to the back of the array
 */
class FCFS_Scheduler{
  constructor(){
    this.processes = []; //Initializing the processes as an empty array
  }

  _add(process){
    this.processes.push(process);
  }

  _run(){
      while (this.processes.length) {
        if(this.processes[0].index < this.processes[0].burstTime){
          this.processes[0]._run();
        }
        else{
          this.processes.shift();
        }
      }
  }
}

/**
 * SJF (Shortest Job First)
 */
 class SJF_Scheduler{
  constructor(){
    this.processes = []; //Initializing the processes as an empty array
  }

  _add(process){
    this.processes.push(process);
  }

  _run(){
    this._init();
     console.log(this.processes)
  }

  _init(){
    for (let i = 0; i < this.processes.length; i++) {
      for(let j = 0; j < this.processes.length - i - 1; j++){
        if(this.processes[0].index > this.processes[0].burstTime){
          for(let k = 0; k < 5; k++){
            this.processes[0].shift();
          }
        }
      }
      
    }
  }
}

const scheduler = new SJF_Scheduler();

scheduler._add(new Process("P1", 2, 3));
scheduler._add(new Process("P2", 0, 4));
scheduler._add(new Process("P3", 4, 2));
scheduler._add(new Process("P4", 5, 4));

scheduler._run();

document.querySelector('#app').innerHTML = 
`
  <header><h1>CPU Scheduling Algorithms</h1></header>
  <hr  />
  
`
