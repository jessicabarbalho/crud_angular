require "rails_helper"

RSpec.describe User, :type => :model do
	context "validations" do
		context "presence" do
			it "should not be valid without name" do
				u = User.create(name: "", email: "jj@gmail.com")
				
				expect(u).not_to be_valid
				expect(u.errors[:name]).not_to be_empty
			end

			it "should not be valid without email" do
				u = User.create(name: "Eduardo", email: "")
				
				expect(u).not_to be_valid
				expect(u.errors[:email]).not_to be_empty
			end
		end

		context "format" do
			it "should not be valid when e-mail does not have @" do
				u = User.create(name: "Invalid", email: "invalid.inv")
				
				expect(u).not_to be_valid
				expect(u.errors[:email]).not_to be_empty
			end

			it "should not be valid when e-mail does not have dots" do
				u = User.create(name: "Invalid", email: "invalid@inv")

				expect(u).not_to be_valid
				expect(u.errors[:email]).not_to be_empty
			end
		end

		context "uniquiness" do
			it "should not allow identicals emails" do
				u1 = User.create(name: "Eduardo", email: "ed@gmail.com")
				u2 = User.create(name: "Edmilson", email: "ed@gmail.com")

				expect(u2).not_to be_valid
				expect(u2.errors[:email]).not_to be_empty
			end
		end
	end
end