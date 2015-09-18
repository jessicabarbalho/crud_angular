source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.4'
# Use mysql2 as the database for Active Record
gem 'mysql2', '~> 0.3.13'
gem 'mail_validation'

gem 'roar-rails', '~> 1.0.1'
gem 'multi_json', '~> 1.11.2'
gem 'rack-cors', :require => 'rack/cors'

# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

group :development, :test do
	# Call 'byebug' anywhere in the code to stop execution and get a debugger console
	gem 'byebug'
	gem 'rspec-rails', '~> 3.0'
end

group :development do
	# Access an IRB console on exception pages or by using <%= console %> in views
	gem 'web-console', '~> 2.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]