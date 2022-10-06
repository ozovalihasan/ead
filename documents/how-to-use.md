# Entity Association Diagram


This document explains how to use EAD(Entity Association Diagram).

After reading this document, you will know:

* How to generate basic associations for Ruby on Rails

---

## The Types of Associations


EAD supports five types of associations:

* [`belongs_to`](#The-belongs_to-Association)
* [`has_one`](#The-has_one-Association)
* [`has_many`](#The-has_many-Association)
* [`has_many :through`](#the-has_many-through-association)
* [`has_one :through`](#the-has_one-through-association)

In the remainder of this documentation, you'll learn how to declare and use the various forms of associations. But first, a quick introduction to the situations where each association type is appropriate.

[`belongs_to`]: https://api.rubyonrails.org/classes/ActiveRecord/Associations/ClassMethods.html#method-i-belongs_to
[`has_many`]: https://api.rubyonrails.org/classes/ActiveRecord/Associations/ClassMethods.html#method-i-has_many
[`has_one`]: https://api.rubyonrails.org/classes/ActiveRecord/Associations/ClassMethods.html#method-i-has_one

### The `belongs_to` Association

belongs_to association is added automatically.

### The `has_one` Association

For example, if each supplier in your application has only one account, you'd declare the supplier model like this:

```ruby
class Supplier < ApplicationRecord
  has_one :account
end

class Account < ApplicationRecord
  belongs_to :supplier
end
```

![has_one Association Diagram](./images/has-one.png)
![has_one EAD](./images/has-one-ead.png)

The corresponding migration might look like this:

```ruby
class CreateSuppliers < ActiveRecord::Migration[7.0]
  def change
    create_table :suppliers do |t|
      t.string :name

      t.timestamps
    end
  end
end

class CreateAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :accounts do |t|
      t.string :account_number

      t.timestamps
    end
  end
end

class AddSupplierRefToAccount < ActiveRecord::Migration[7.0]
  def change
    add_reference :accounts, :supplier, null: false, foreign_key: true
  end
end

```

### The `has_many` Association

 For example, in an application containing authors and books, the author model could be declared like this:

```ruby
class Author < ApplicationRecord
  has_many :books
end

class Book < ApplicationRecord
  belongs_to :author
end
```


![has_many Association Diagram](./images/has-many.png)
![has_many EAD](./images/has-many-ead.png)


The corresponding migration might look like this:

```ruby
class CreateAuthors < ActiveRecord::Migration[7.0]
  def change
    create_table :authors do |t|
      t.string :name

      t.timestamps
    end
  end
end

class CreateBooks < ActiveRecord::Migration[7.0]
  def change
    create_table :books do |t|
      t.datetime :published_at

      t.timestamps
    end
  end
end

class AddAuthorRefToBook < ActiveRecord::Migration[7.0]
  def change
    add_reference :books, :author, null: false, foreign_key: true
  end
end

```


### The `has_many :through` Association

 For example, consider a medical practice where patients make appointments to see physicians. The relevant association declarations could look like this:

```ruby
class Physician < ApplicationRecord
  has_many :appointments
  has_many :patients, through: :appointments
end

class Appointment < ApplicationRecord
  belongs_to :physician
  belongs_to :patient
end

class Patient < ApplicationRecord
  has_many :appointments
  has_many :physicians, through: :appointments
end

```


![has_many :through Association Diagram](./images/has-many-through.png)
![has_many :through EAD](./images/has-many-through-ead.png)


The corresponding migration might look like this:

```ruby
class CreatePhysicians < ActiveRecord::Migration[7.0]
  def change
    create_table :physicians do |t|
      t.string :name

      t.timestamps
    end
  end
end

class CreatePatients < ActiveRecord::Migration[7.0]
  def change
    create_table :patients do |t|
      t.string :name

      t.timestamps
    end
  end
end

class CreateAppointments < ActiveRecord::Migration[7.0]
  def change
    create_table :appointments do |t|
      t.datetime :appointment_date

      t.timestamps
    end
  end
end

class AddPhysicianRefToAppointment < ActiveRecord::Migration[7.0]
  def change
    add_reference :appointments, :physician, null: false, foreign_key: true
  end
end

class AddPatientRefToAppointment < ActiveRecord::Migration[7.0]
  def change
    add_reference :appointments, :patient, null: false, foreign_key: true
  end
end

```


### The `has_one :through` Association

For example, if each supplier has one account, and each account is associated with one account history, then the supplier model could look like this:

```ruby
class Supplier < ApplicationRecord
  has_one :account
  has_one :account_history, through: :account
end

class Account < ApplicationRecord
  belongs_to :supplier
  has_one :account_history
end

class AccountHistory < ApplicationRecord
  belongs_to :account
end
```

![has_one :through Association Diagram](./images/has-one-through.png)
![has_one :through EAD](./images/has-one-through-ead.png)

The corresponding migration might look like this:

```ruby
class CreateSuppliers < ActiveRecord::Migration[7.0]
  def change
    create_table :suppliers do |t|
      t.string :name

      t.timestamps
    end
  end
end

class CreateAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :accounts do |t|
      t.string :account_number

      t.timestamps
    end
  end
end

class CreateAccountHistories < ActiveRecord::Migration[7.0]
  def change
    create_table :account_histories do |t|
      t.integer :credit_rating

      t.timestamps
    end
  end
end

class AddAccountRefToAccountHistory < ActiveRecord::Migration[7.0]
  def change
    add_reference :account_histories, :account, null: false, foreign_key: true
  end
end

class AddSupplierRefToAccount < ActiveRecord::Migration[7.0]
  def change
    add_reference :accounts, :supplier, null: false, foreign_key: true
  end
end

```

⚠️: It is not necessary to define "has_many :through" and "has_one :through" explicitly. The correct one will be added by EAD gem automatically when EAD gem is run. 

### The `has_and_belongs_to_many` Association

`has_and_belongs_to_many` association isn't implemented to make the codebase simpler. 

NOTE: If it is requested, it can be added with the next versions.

### Polymorphic Associations

For example, you might have a picture model that belongs to either an employee model or a product model. Here's how this could be declared:

```ruby
class Picture < ApplicationRecord
  belongs_to :imageable, polymorphic: true
end

class Employee < ApplicationRecord
  has_many :pictures, as: :imageable
end

class Product < ApplicationRecord
  has_many :pictures, as: :imageable
end
```


![polymorphic Association Diagram](./images/polymorphic.png)
![polymorphic EAD](./images/polymorphic-ead.png)

The corresponding migration might look like this:

```ruby
class CreatePictures < ActiveRecord::Migration[7.0]
  def change
    create_table :pictures do |t|
      t.references :imageable, polymorphic: true, null: false

      t.timestamps
    end
  end
end

class CreateEmployees < ActiveRecord::Migration[7.0]
  def change
    create_table :employees do |t|
      t.string :name

      t.timestamps
    end
  end
end

class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name

      t.timestamps
    end
  end
end

```

### Self Joins

```ruby
class Employee < ApplicationRecord
  belongs_to :subordinate, optional: true, class_name: "Employee"
  has_many :managers, class_name: "Employee", foreign_key: "subordinate_id"
end
```


![self joins EAD](./images/self-joins-ead.png)

The corresponding migration might look like this:

```ruby
class CreateEmployees < ActiveRecord::Migration[7.0]
  def change
    create_table :employees do |t|

      t.timestamps
    end
  end
end

class AddManagerRefToEmployee < ActiveRecord::Migration[7.0]
  def change
    add_reference :employees, :manager, null: true, foreign_key: { to_table: :employees }
  end
end

```

### Single Table Inheritance (STI)
Sometimes, you may want to share fields and behavior between different models.

```ruby
class Vehicle < ApplicationRecord
end

class Car < Vehicle
end

class SportCar < Car
end
```


![Single Table Inheritance EAD](./images/single-table-inheritance-ead.png)

The corresponding migration might look like this:

```ruby
class CreateVehicles < ActiveRecord::Migration[7.0]
  def change
    create_table :vehicles do |t|
      t.string :type
      t.string :color
      t.decimal :price

      t.timestamps
    end
  end
end
```

## Extra Features

EAD has 'table's and 'attribute's to define tables and their attributes in a Rails project.

!['table's and 'attribute's](./images/table_attribute.png)

EAD has 'entity's and 'association's to define [any association](#The-Types-of-Associations) between entities.
## How does EAD gem work?

- Model and migration files are generated for same table and entity names;

  ![has_many EAD](./images/has-many-ead.png)


```ruby
class Author < ApplicationRecord
  has_many :books
end


class Book < ApplicationRecord
  belongs_to :author 
end


class CreateAuthors < ActiveRecord::Migration[7.0]
  def change
    create_table :authors do |t|
      t.string :name

      t.timestamps
    end
  end
end

class CreateBooks < ActiveRecord::Migration[7.0]
  def change
    create_table :books do |t|
      t.datetime :published_at

      t.timestamps
    end
  end
end

class AddAuthorRefToBook < ActiveRecord::Migration[7.0]
  def change
    add_reference :books, :author, null: false, foreign_key: true
  end
end
```

- Model and migration files are generated for different table and entity names;

![different names of an entity and its table in an association EAD](./images/different-name-clone-real.png)

```ruby
class Author < ApplicationRecord
  has_many :novels, class_name: "Book", foreign_key: "publisher_id"
end

class Book < ApplicationRecord
  belongs_to :publisher, class_name: "Author"
end


class CreateAuthors < ActiveRecord::Migration[7.0]
  def change
    create_table :authors do |t|
      t.string :name

      t.timestamps
    end
  end
end

class CreateBooks < ActiveRecord::Migration[7.0]
  def change
    create_table :books do |t|
      t.date :published_at

      t.timestamps
    end
  end
end

class AddPublisherRefToBook < ActiveRecord::Migration[7.0]
  def change
    add_reference :books, :publisher, null: false, foreign_key: { to_table: :authors }
  end
end
```

# Questions

Please check [the examples](../README.md#examples) if you need more clarification.
## How to add and delete tables and their attributes?

The related buttons should be clicked.

![add delete table association  EAD](./images/add-delete-table-attribute.png)

⚠️: If a table is deleted, the all entities referring to this table will be deleted automatically.

## How to use STI?

STI can be used by selecting a dropdown next to a table name.

![use STI EAD](./images/use-sti-ead.gif)

## How to add an entity?

An entity can be added by dragging and dropping a table.

![add an entity EAD](./images/add-an-entity-ead.gif)

## How to change the related table of an entity?

When the table name of an entity is clicked by the middle mouse button, a dropdown list will be opened. The related table can be changed by selecting any of the table names.

![change table name of entity EAD](./images/change-table-name-of-entity-ead.gif)

## How to add associations?

- All necessary buttons will be shown when the mouse hover on an entity.

- 'has_one' association can be added by dragging ![has_one](./images/has_one.png) handler and dropping on one of the gray areas.
- 'has_many' association can be added by dragging ![has_many](./images/has_many.png) handler.
- ':through' association can be added by dragging ![through](./images/through.png) handler.

![association buttons EAD](./images/association-buttons.png)

![drop area EAD](./images/drop-area-ead.png)

## How to delete associations?

Firstly, one association should be selected and then 'Delete' key should be pressed or a button, shown when the association is selected, should be clicked.

![selected association EAD](./images/select-association.png)

## How to delete entities?

Firstly, one entity should be selected and then 'Delete' key should be pressed.

![select entity EAD](./images/select-entity.png)

⚠️: If an entity is deleted, the all associations connected to this entity will be deleted automatically.


# Warnings

⚠️ The names of tables, entities and attributes can be in any form like 'account_history', 'Account_history', 'Account_histories', 'account_histories', 'AccountHistory', and 'AccountHistories', but space between words is not allowed.

# Edge Cases

- If there is a through association bidirectionally between two entities referring to the same table, entities used to define 'through' association should be separate. 

![same entities has many trough EAD](./images/same-entities-has-many-trough.png)

- If not, [only one entity to define 'through' association](#The-has_many-:through-Association) is enough.

![has_many :through EAD](./images/has-many-through-ead.png)