class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :gender
      t.date :birth_day

      t.timestamps
    end
  end
end
