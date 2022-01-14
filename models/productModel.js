class Collection {
    #Model
    #currentId
    #items
    constructor(model, startingData) {
        this.#Model = model;
        this.#currentId = 0;
        this.#items = this.#populateItems( startingData );
    }

    #populateItems( startingData ) {
        return startingData.reduce(( acc, item, idx ) => {
            this.#currentId = idx;
            acc[this.#currentId] = new this.#Model(item, idx)
            return acc;
        }, {});
    }

    #generateId(){
        return ++this.#currentId
    }

    find() {
        return Object.values(this.#items);
    }

    findById( itemId, callBack ) {
        if (!itemId) return console.log("missing id in first argument");
    
        if (typeof callBack !== "function") {
            return console.log("missing function in second argument");
        }
    
        let error;
        const item = this.#items[itemId];
    
        if (!item) {
            error = { message: `item with id "${itemId}" can't be found` };
        }
    
        return callBack(error, item);
    }

 create( data, callBack ) {
    if (!data) return console.log("missing data in first argument");

    if (typeof callBack !== "function") {
      return console.log("missing function in second argument");
    }

    let error, newItem;

    const isEmpty = Object.keys(data).every(field => data[field] === "");

    if (isEmpty) {
      error = { message: `you have empty fields` };
    } else {
      
      newItem = new this.#Model( data, this.#generateId());

      this.#items[newItem.id] = newItem;
    }

    return callBack(error, newItem);
  }
};

class Product {
    constructor( data, id ) {
        this.id = id;
        this.name = data.name;
        this.price = data.price;
        this.image = data.image;
    }
}




module.exports = new Collection(Product, [
    { 
        name: "Car", 
        price: 20000, 
        img: "http://www.gowithgo.net/wp-content/uploads/2011/07/Flintstone_Mobile-150x150.jpg"
      },
      { 
        name: "Cat", 
        price: 100, 
        img: "http://animagehub.com/wp-content/uploads/2016/10/Pink-panther-vector-5-150x150.jpg"
      },
      { 
        name: "Crab", 
        price: 2, 
        img: "http://scontent.cdninstagram.com/t51.2885-19/s150x150/13402342_1111471978911960_1380878568_a.jpg"
      },
      { 
        name: "Crib", 
        price: 200, 
        img: "https://s-media-cache-ak0.pinimg.com/originals/99/29/ee/9929eef9086e07bd7e50102bc37ff3a8.jpg"
      },
      { 
        name: "Coat", 
        price: 200, 
        img: "http://cooljunkyouneed.com/4548/uploads/2014/02/Workaholics-Bear-Coat-150x150.jpg"
      },
      { 
        name: "Cake", 
        price: 3, 
        img: "http://scontent.cdninstagram.com/t51.2885-19/s150x150/11356601_447610668772561_439752401_a.jpg"
      },
      { 
        name: "Concussion", 
        price: 0, 
        img: "http://youngmenshealthsite.org/wp-content/uploads/2015/05/concussion1-150x150.jpg"
      },
      { 
        name: "Coal", 
        price: 1, 
        img: "http://www.whitecatpublications.com/wp-content/uploads/2010/12/lump-of-coal-150x150.jpg"
      },
      { 
        name: "Cyclone", 
        price: 70000, 
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cyclone_Mala.JPG/150px-Cyclone_Mala.JPG"
      },
      { 
        name: "Career", 
        price: 13500, 
        img: "http://waterfordwhispersnews.com/wp-content/uploads/2014/10/happy-worker-e1412334561186-150x150.jpg"
      },
      { 
        name: "Cillian Murphy", 
        price: 400, 
        img: "http://static.buzznet.com/uploads/2012/03/msg-133176055505-150x150.jpg"
      },
      { 
        name: "Climate Change", 
        price: 9, 
        img: "http://scitechdaily.com/images/Detailed-Global-Climate-Change-Projections-150x150.jpg" 
      }
    ]);