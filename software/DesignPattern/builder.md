```
/* Builder */
package builder;

import product.Toy;

public abstract class ToyBuilder {
    protected Toy toy;

    public Toy getToy() {
        return toy;
    }

    public ToyBuilder create() {
        toy = new Toy();
        return this;
    }

    public abstract ToyBuilder buildName();
    public abstract ToyBuilder buildHair();
    public abstract ToyBuilder buildClothes();
    public abstract ToyBuilder buildPants();
    public abstract ToyBuilder buildShoes();
}
/* Concrete Builder */
package builder;

public class PoohBuilder extends ToyBuilder {
    @Override
    public ToyBuilder buildName() {
        toy.setName("Pooh");
        return this;
    }

    @Override
    public ToyBuilder buildHair() {
        toy.setHair("Yellow");
        return this;
    }

    @Override
    public ToyBuilder buildClothes() {
        toy.setClothes("Red short sleeved T-shirt");
        return this;
    }

    @Override
    public ToyBuilder buildPants() {
        return this;
    }

    @Override
    public ToyBuilder buildShoes() {
        return this;
    }
}
/* Director */
package director;

import builder.ToyBuilder;
import product.Toy;

public class Director {
    private ToyBuilder toyBuilder;

    public void setToyBuilder(ToyBuilder toyBuilder) {
        this.toyBuilder = toyBuilder;
    }

    public Toy constructToy() {
        return toyBuilder.create()
                .buildName()
                .buildHair()
                .buildClothes()
                .buildPants()
                .buildPants()
                .getToy();
    }
}
import builder.PoohBuilder;
import builder.ZzangGuBuilder;
import director.Director;
import product.Toy;

public class Main {
    public static void main(String[] args) {
        Director director = new Director();

        PoohBuilder poohBuilder = new PoohBuilder();
        ZzangGuBuilder zzangGuBuilder = new ZzangGuBuilder();

        director.setToyBuilder(poohBuilder);
        //director.setToyBuilder(zzangGuBuilder);

        Toy toy = director.constructToy();

        System.out.println(toy);
    }
}

```

참조 : https://4z7l.github.io/2021/01/19/design_pattern_builder.html
