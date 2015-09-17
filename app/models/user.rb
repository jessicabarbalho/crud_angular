class User < ActiveRecord::Base
	validates_presence_of :name, :email
	validates :email, "MailValidation::Email" => true
	validates_uniqueness_of :email, case_sensitive: false
end
