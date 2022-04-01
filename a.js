
// Input times for the 9 processes
const p1 = [ 7, 22, 6, 19, 12, 44, 8, 21, 10, 37, 5, 24, 6, 44, 7, 43, 8 ];
const p2 = [ 14, 48, 15, 44, 17, 42, 22, 37, 19, 76, 14, 41, 16, 31, 17, 43, 18 ];
const p3 = [ 8, 43, 7, 41, 6, 45, 8, 21, 9, 35, 14, 18, 5, 26, 3, 31, 6 ];
const p4 = [ 13, 37, 4, 41, 5, 35, 12, 41, 8, 55, 15, 34, 6, 73, 5, 77, 3 ];
const p5 = [ 6, 34, 7, 21, 5, 44, 6, 32, 7, 28, 3, 48, 11, 44, 6, 33, 3, 28, 4 ];
const p6 = [ 9, 32, 4, 28, 5, 10, 6, 12, 7, 14, 9, 18, 12, 24, 15, 30, 8 ];
const p7 = [ 14, 46, 17, 41, 11, 42, 15, 21, 4, 32, 7, 19, 16, 33, 10 ];
const p8 = [ 4, 64, 5, 53, 6, 44, 4, 73, 6, 87, 5, 66, 8, 25, 6, 33, 9, 41, 7 ];
const p9 = [ 13, 37, 8, 41, 7, 27, 12, 29, 5, 27, 6, 18, 3, 33, 4, 62, 6 ];

const timeQuantum_1 = 8;	// The time quantum for queue 1
const timeQuantum_2 = 12;	// The time quantum for queue 2
							// Queue 3 uses FCFS

let currentTime = 0;			// Total Time system has been running

class Process{
	constructor({pid, ptime}){
		//Process info
		this.data = {
			pid,
			ptime,
			arrivalTime: 0,
			timeQuantum: timeQuantum_1,
		}
		this.stats = {
			responseTime: 0,
			turnAroundTime: 0,
			totalWaitingTime: 0,
		}
		this.running = {
			priority: 1,
		}
	}
}

class MLFQ{
	constructor(){
		this.running = false;
		
		this.ready = [];
		this.io =  [];
		this.cpu = [];
		this.waiting = [];
	}

	run(processes){
		// All Processes arrive at time 0 and are initiated as Queue 1
		processes.forEach(process => {
			this.ready.push(process);
		})

		// Begin
		while(this.ready.length != 0){

			while(this.waiting.length != 0){
				if(this.waiting[0].running.priority === 1){
					console.log('Here');
					break;
				}
				else if(this.waiting[0].running.priority === 2){
					this.waiting.push(this.waiting[0]);
					this.waiting.shift();
				}
			}

			if(this.ready[0].data.ptime[this.ready[0].data.ptime.findIndex(t => {return t != 0})] <= this.ready[0].data.timeQuantum){
				currentTime += this.ready[0].data.ptime[this.ready[0].data.ptime.findIndex(t => {return t != 0})];
				this.ready[0].data.ptime[this.ready[0].data.ptime.findIndex(t => {return t != 0})] = 0;
				

				this.io.push(this.ready[0]);
				this.ready.shift();

				this.io[0].data.arrivalTime += this.io[0].data.ptime[this.io[0].data.ptime.findIndex(t => {return t != 0})];
				this.io[0].data.ptime[this.io[0].data.ptime.findIndex(t => {return t != 0})] = 0;

				this.waiting.push(this.io[0]);
				this.io.shift();
			}
			else{
				currentTime += this.ready[0].data.timeQuantum;
				this.ready[0].data.ptime[this.ready[0].data.ptime.findIndex(t => {return t != 0})] = this.ready[0].data.ptime[this.ready[0].data.ptime.findIndex(t => {return t != 0})] - this.ready[0].data.timeQuantum;
				this.ready[0].running.priority++;

				// Process goes back into the ready queue with its updated time and priority
				this.ready.push(this.ready[0]);
				this.ready.shift();	// Process gets shifted out from the front on the ready queue
			}

			
		}
	}	
}

const p_1 = new Process({pid: "P1", ptime: p1});
const p_2 = new Process({pid: "P2", ptime: p2});
const p_3 = new Process({pid: "P3", ptime: p3});
const p_4 = new Process({pid: "P4", ptime: p4});
const p_5 = new Process({pid: "P5", ptime: p5});
const p_6 = new Process({pid: "P6", ptime: p6});
const p_7 = new Process({pid: "P7", ptime: p7});
const p_8 = new Process({pid: "P8", ptime: p8});
const p_9 = new Process({pid: "P9", ptime: p9});

const scheduler = new MLFQ();

// Create process objects (All processes start in queue 1: with a timeQuantum of 8)
var processArray = [p_1, p_2, p_3, p_4, p_5, p_6, p_7, p_8, p_9];

scheduler.run(processArray);

console.log(scheduler);
console.log(currentTime);