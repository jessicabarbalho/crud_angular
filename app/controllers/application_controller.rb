class ApplicationController < ActionController::Base
	# Prevent CSRF attacks by raising an exception.
	# For APIs, you may want to use :null_session instead.
	skip_before_filter :verify_authenticity_token
	after_filter :set_access_control_headers
	
	private
	
	# Este método no rails permite o compartilhamento dos recursos
	# entre domínios distintos
	def set_access_control_headers
		headers['Access-Control-Allow-Origin'] = '*'
		headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
		headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-Prototype-Version, X-CSRF-Token'
	end
end
