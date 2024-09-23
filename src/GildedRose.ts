class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

interface Updatable {
    update(): void;
}

class BasicItem implements Updatable {
    item: Item;

    constructor(item: Item) {
        this.item = item;
    }

    update(): void {
        this.item.sellIn -= 1;

        if (this.item.quality > 0) {
            this.item.quality -= this.item.sellIn < 0 ? 2 : 1;
        }

        if (this.item.quality < 0) {
            this.item.quality = 0;
        }
    }
}

class AgedBrieItem extends BasicItem {
    update(): void {
        this.item.sellIn -= 1;

        if (this.item.quality < 50) {
            this.item.quality += this.item.sellIn < 0 ? 2 : 1;
        }

        if (this.item.quality > 50) {
            this.item.quality = 50;
        }
    }
}

class SulfurasItem implements Updatable {
    item: Item;

    constructor(item: Item) {
        this.item = item;
    }

    update(): void {
        // Sulfuras does not decrease in quality or sellIn
    }
}

class BackstagePassItem extends BasicItem {
    update(): void {
        this.item.sellIn -= 1;

        if (this.item.sellIn < 0) {
            this.item.quality = 0;
        } else if (this.item.sellIn < 5) {
            this.item.quality += 3;
        } else if (this.item.sellIn < 10) {
            this.item.quality += 2;
        } else {
            this.item.quality += 1;
        }

        if (this.item.quality > 50) {
            this.item.quality = 50;
        }
    }
}

class ConjuredItem extends BasicItem {
    update(): void {
        this.item.sellIn -= 1;

        if (this.item.quality > 0) {
            this.item.quality -= this.item.sellIn < 0 ? 4 : 2;
        }

        if (this.item.quality < 0) {
            this.item.quality = 0;
        }
    }
}

class ItemFactory {
    static create(item: Item): Updatable {
        switch (item.name) {
            case 'Aged Brie':
                return new AgedBrieItem(item);
            case 'Sulfuras':
                return new SulfurasItem(item);
            case 'Backstage passes':
                return new BackstagePassItem(item);
            case 'Conjured':
                return new ConjuredItem(item);
            default:
                return new BasicItem(item);
        }
    }
}

class GildedRose {
    items: Item[];

    constructor(items: Item[]) {
        this.items = items;
    }

    updateQuality(): void {
        this.items.forEach(item => {
            const updatableItem = ItemFactory.create(item);
            updatableItem.update();
        });
    }
}

// Example usage:
const items = [
    new Item('Aged Brie', 5, 0),
    new Item('Sulfuras', 0, 80),
    new Item('Backstage passes', 2, 20),
    new Item('Conjured', 3, 6),
];

const gildedRose = new GildedRose(items);
gildedRose.updateQuality();

console.log(gildedRose.items);
