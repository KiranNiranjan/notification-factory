/*
Copyright 2018 KiKe. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import * as Rx from 'rxjs';

export class Queue extends Rx.Subject<Queue> {
    private items: any = [];

    public add(item: any) {
        if (this.observers.length > 0) {
            this.next(item);
        } else {
            this.items.push(item);
        }
    }

    public subscribe(observer: any) {
        const sub = super.subscribe(observer);
        this.items.forEach((item: any) => this.next(item));
        this.items = [];
        return sub;
    }
}
