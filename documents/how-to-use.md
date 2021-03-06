Entity Association Diagram
==========================

This document explains how to use EAD(Entity Association Diagram )

After reading this document, you will know:

* How to generate basic associations for Ruby on Rails

--------------------------------------------------------------------------------

The Types of Associations
-------------------------

EAD supports seven types of associations:

* [`belongs_to`](#The-belongs_to-Association)
* [`has_one`](#The-has_one-Association)
* [`has_many`](#The-has_many-Association)
* [`has_many :through`](#The-has_many-:through-Association)
* [`has_one :through`](#The-has_one-:through-Association)

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
class CreateSuppliers < ActiveRecord::Migration[6.1]
  def change
    create_table :suppliers do |t|
      t.string :name

      t.timestamps
    end
  end
end

class CreateAccounts < ActiveRecord::Migration[6.1]
  def change
    create_table :accounts do |t|
      t.string :account_number
      t.references :supplier, null: false, foreign_key: true

      t.timestamps
    end
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
class CreateAuthors < ActiveRecord::Migration[6.1]
  def change
    create_table :authors do |t|
      t.string :name

      t.timestamps
    end
  end
end

class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      t.datetime :published_at
      t.references :author, null: false, foreign_key: true

      t.timestamps
    end
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
class CreatePhysicians < ActiveRecord::Migration[6.1]
  def change
    create_table :physicians do |t|
      t.string :name

      t.timestamps
    end
  end
end

class CreatePatients < ActiveRecord::Migration[6.1]
  def change
    create_table :patients do |t|
      t.string :name

      t.timestamps
    end
  end
end

class CreateAppointments < ActiveRecord::Migration[6.1]
  def change
    create_table :appointments do |t|
      t.datetime :appointment_date
      t.references :physician, null: false, foreign_key: true
      t.references :patient, null: false, foreign_key: true

      t.timestamps
    end
  end
end

```

WARNING: The official Ruby on Rails documentation is suggesting one more feature of `has_many :through` as "shortcut" for nested `has_many` associations. But, this feature should be added manually for nest `has_many` associations.

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
class CreateSuppliers < ActiveRecord::Migration[6.1]
  def change
    create_table :suppliers do |t|
      t.string :name

      t.timestamps
    end
  end
end

class CreateAccounts < ActiveRecord::Migration[6.1]
  def change
    create_table :accounts do |t|
      t.string :account_number
      t.references :supplier, null: false, foreign_key: true

      t.timestamps
    end
  end
end

class CreateAccountHistories < ActiveRecord::Migration[6.1]
  def change
    create_table :account_histories do |t|
      t.integer :credit_rating
      t.references :account, null: false, foreign_key: true

      t.timestamps
    end
  end
end
```

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
class CreatePictures < ActiveRecord::Migration[6.1]
  def change
    create_table :pictures do |t|
      t.references :imageable, polymorphic: true, null: false  

      t.timestamps
    end
  end
end

class CreateEmployees < ActiveRecord::Migration[6.1]
  def change
    create_table :employees do |t|

      t.timestamps
    end
  end
end

class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|

      t.timestamps
    end
  end
end

```

### Self Joins

```ruby
class Employee < ApplicationRecord
  belongs_to :subordinate , optional: true, class_name: "Employee"
  has_many :managers, class_name: "Employee", foreign_key: "subordinate_id"
end
```


![self joins EAD](./images/self-joins-ead.png)

The corresponding migration might look like this:

```ruby
class CreateEmployees < ActiveRecord::Migration[6.1]
  def change
    create_table :employees do |t|
      t.references :subordinate, null: true, foreign_key: { to_table: :employees }

      t.timestamps
    end
  end
end

```

## Extra Features

EAD has 'attribute' block to add an attribute to any entity.

EAD has 'entity container' block to put all entities in an organized block. Entities and their attributes can be defined in this container.

EAD has 'entities & associations' block to define any association. In this block, only [clone entities](#Clone-Entities) and associations can be used.
## Clone Entities

Clone entities can be added by selecting any 'entities & associations' or association block inside of 'entities & associations' block and clicking ![clone](./images/clone.png).

![no selection EAD](./images/no-selection.png)
![prepare clone EAD](./images/prepare-clone.png)
![after clone EAD](./images/after-clone.png)
![deselect block EAD](./images/deselect.png)
![same names of real and clone entities EAD](./images/clone-and-real.png)

Entity clones are used to define associations between two entity.
![has_many EAD](./images/has-many-ead.png)

The color of entity(called 'real entity') is ![blue-1](./images/blue-1.png). 

The color of clone entity is ![orange](./images/orange.png). 


- Model and migration files are generated for same real and clone names;

  ![has_many EAD](./images/has-many-ead.png)


```ruby
  class Author < ApplicationRecord
    has_many :books
  end


  class Book < ApplicationRecord
    belongs_to :author 
  end


  class CreateAuthors < ActiveRecord::Migration[6.1]
    def change
      create_table :authors do |t|
        t.string :name

        t.timestamps
      end
    end
  end


  class CreateBooks < ActiveRecord::Migration[6.1]
    def change
      create_table :books do |t|
        t.datetime :published_at
        t.references :author, null: false, foreign_key: true 

        t.timestamps
      end
    end
  end
```

- Model and migration files are generated for different real and clone entity names;

![different names of real and clone entities in an association EAD](./images/different-name-clone-real.png)

```ruby
  class Author < ApplicationRecord
    has_many :novels, class_name: "Book", foreign_key: "publisher_id"
  end

  class Book < ApplicationRecord
    belongs_to :publisher , class_name: "Author"
  end

  class CreateAuthors < ActiveRecord::Migration[6.1]
    def change
      create_table :authors do |t|
        t.string :name

        t.timestamps
      end
    end
  end

  class CreateBooks < ActiveRecord::Migration[6.1]
    def change
      create_table :books do |t|
        t.datetime :published_at
        t.references :publisher, null: false, foreign_key: { to_table: :authors }

        t.timestamps
      end
    end
  end

```

## How to Add associations

- 'has_many' association can be added by using ![has_many](./images/has_many.png) or has_many block.
- 'has_one' association can be added by using ![has_one](./images/has_one.png) or has_one block.
- ':through' association can be added by using ![through](./images/through.png) or :through block.

![association buttons EAD](./images/association-buttons.png)
![association blocks EAD](./images/association-blocks.png)

## Delete Blocks

A dragged block is deleted if it is not paired with another block. They are shown with ![removed block](./images/red.png). 
Also, any block can be deleted by using ![delete](./images/delete.png).
## Warnings

?????? The name of entities and attributes can be in any form like 'account_history', 'Account_history', 'Account_histories', 'account_histories', 'AccountHistory', and 'AccountHistories', but space between words is not allowed.

?????? EAD allows using only one clone entity inside of any association block.

## Edge Cases

- The name of entities cannot contain space. But, there is only one exception. If, "has_many :through" association is used between clones of the same entities, the middle entity should be 'one_entity || second_entity'. 

![same entities has many trough EAD](./images/same-entities-has-many-trough.png)