import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
    private cats: Cat[] = [];

    create(name: string, age: number, breed: string): Cat {
        const id = new Date().toISOString().substring(10, 25);
        const cat: Cat = {
            id,
            name,
            age,
            breed
        }
        this.cats.push(cat);
        return cat;
    }

    findAll(): Cat[] {
        return this.cats;
    }

    findById(id: string): Cat {
        return this.cats.find(cat => cat.id === id)
    }

    delete(id: string) {
        let cats = this.cats.filter(cat => cat.id !== id)
        this.cats = cats;
    }

    update(id: string, age: number): Cat {
        let cat = this.findById(id)
        cat.age = age;
        return cat;
    }
}