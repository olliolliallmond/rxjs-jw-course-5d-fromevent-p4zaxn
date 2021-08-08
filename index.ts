import { fromEvent, Observable } from 'rxjs';

const triggerButton = document.querySelector('button#trigger');

/**
  Simple Observable
  
  fromEvent<MouseEvent>(triggerButton, 'click').subscribe(
   event => console.log(event.type, event.x, event.y)
  );
 */

/**
// Created observable
const triggerClick$ = new Observable<MouseEvent>(subscriber => {
  triggerButton.addEventListener('click', event => {
    subscriber.next(event);
  });
});

triggerClick$.subscribe(event => console.log(event.type, event.x, event.y));
*/

/*
//Clean up with fromEvent!
const subscription = fromEvent<MouseEvent>(triggerButton, 'click').subscribe(
  event => console.log(event.type, event.x, event.y)
);

setTimeout(() => {
  console.log('Unsubscribing');
  subscription.unsubscribe();
}, 5000);
*/

// Cleanup with our own observable

const triggerClick$ = new Observable<MouseEvent>(subscriber => {
  const clickHandler = event => {
    console.log('Event callback executed!');
    subscriber.next(event);
  };

  triggerButton.addEventListener('click', clickHandler);

  return () => {
    triggerButton.removeEventListener('click', clickHandler);
  };
});

const subscription = triggerClick$.subscribe(event =>
  console.log(event.type, event.x, event.y)
);

setTimeout(() => {
  console.log('Unsubscribed');
  subscription.unsubscribe();
}, 5000);
