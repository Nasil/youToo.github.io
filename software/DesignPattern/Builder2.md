```java
public abstract class Pizza {
    public enum Topping {HAM, MUSHROOM, ONION, PEPPER, SAUSAGE}
    final Set<Topping> toppingSet;

    abstract static class Builder<T extends Builder<T>> {
        EnumSet<Topping> toppings = EnumSet.noneOf(Topping.class);
        public T addTopping(Topping topping) {
            toppings.add(Objects.requireNonNull(topping));
            return self();
        }

        abstract Pizza build();

        protected abstract T self();
    }

    Pizza(Builder<?> builder) {
        toppingSet = builder.toppings.clone();
    }

    @Override
    public String toString() {
        return "Pizza{" +
                "toppingSet=" + toppingSet +
                '}';
    }
}
```

```java
public class NyPizza extends Pizza {
    public enum Size {S, M, L}
    private final Size size;

    public static class Builder extends Pizza.Builder<Builder> {
        private final Size size;

        public Builder(Size size) {
            this.size = Objects.requireNonNull(size);
        }

        @Override
        public NyPizza build() {
            return new NyPizza(this);
        }

        @Override
        protected Builder self() {
            return null;
        }
    }

    private NyPizza(Builder builder) {
        super(builder);
        size = builder.size;
    }
}
```

```java
NyPizza np = new NyPizza.Builder(NyPizza.Size.S).addTopping(Pizza.Topping.SAUSAGE).addTopping(Pizza.Topping.MUSHROOM).build();
```
