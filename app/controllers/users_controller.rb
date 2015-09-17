class UsersController < ApplicationController
	include Roar::Rails::ControllerAdditions
  	include Roar::Rails::ControllerAdditions::Render

	def index
		@users = User.all
		render json: @users
	end

	def create
		@user = User.new(user_params)
		@user.save
		render json: @user
	end

	def show
		@user = User.find(params[:id])
		render json: @user
	end

	def update
		@id = params[:id]

		@user = User.find(@id)
		@user = User.update(@id, user_params)
		render json: @user
	end

	def destroy
		@user = User.find(params[:id])
		@user.destroy
		render json: @user
	end

	private

	def user_params
		params.require(:user).permit(:name, :email, :birth_day, :gender)
	end
end
