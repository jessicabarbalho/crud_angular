require "rails_helper"

RSpec.describe UsersController, :type => :controller do
  describe "GET #index" do
    it "responds successfully with an HTTP 200 status code" do
        get :index

        expect(response).to be_success
        expect(response).to have_http_status(200)
    end

    it "loads all of the user into @users" do
        user1 = User.create(name: "Fernando", email: "fgb@gmail.com", birth_day: Date.new(1987,2,3), gender: "MALE")
        user2 = User.create(name: "Alice", email: "adf@gmail.com", birth_day: Date.new(1967,6,3), gender: "FEMALE")
        get :index

        expect(assigns(:users)).to match_array([user1, user2])
    end
  end

  describe "POST #create" do
    it "respondes successfully with an HTTP 200 status code" do
        post :create, user: {name: "Alice", email: "adf@gmail.com", birth_day: "12/12/1991", gender: "FEMALE"}

        expect(response).to be_success
        expect(response).to have_http_status(200)
    end

    it "creates a new user" do
        post :create, user: {name: "Alice", email: "adf@gmail.com", birth_day: "12/12/1991", gender: "FEMALE"}

        expect(response).to be_success
        expect(assigns(:user).id).not_to be_nil
    end
  end

  describe "GET #show" do
    it "respondes successfully with an HTTP 200 status code" do
        user1 = User.create(name: "Fernando", email: "fgb@gmail.com", birth_day: Date.new(1987,2,3), gender: "MALE")

        get :show, id: user1.id

        expect(response).to be_success
        expect(response).to have_http_status(200)
    end

    it "load the user indicated by id" do
        user1 = User.create(name: "Fernando", email: "fgb@gmail.com", birth_day: Date.new(1987,2,3), gender: "MALE")

        get :show, id: user1.id

        expect(response).to be_success
        expect(assigns(:user).name) == "Fernando"
    end
  end

  describe "PUT #update" do
    it "respondes successfully with an HTTP 200 status code" do
        user1 = User.create(name: "Fernando", email: "fgb@gmail.com", birth_day: Date.new(1987,2,3), gender: "MALE")
        user2 = {name: "Tiago"}

        put :update, {id: user1.id, user: user2}

        expect(response).to be_success
        expect(response).to have_http_status(200)
    end

    it "load the user indicated by id" do
        user1 = User.create(name: "Fernando", email: "fgb@gmail.com", birth_day: Date.new(1987,2,3), gender: "MALE")
        user2 = {name: "Tiago"}

        put :update, {id: user1.id, user: user2}

        expect(response).to be_success
        expect(assigns(:user).name) == "Tiago"
    end
  end

  describe "DELETE #destroy" do
    it "respondes successfully with an HTTP 200 status code" do
        user1 = User.create(name: "Fernando", email: "fgb@gmail.com", birth_day: Date.new(1987,2,3), gender: "MALE")

        delete :destroy, id: user1.id

        expect(response).to be_success
        expect(response).to have_http_status(200)
    end
  end
end