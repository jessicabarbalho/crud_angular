module UsersRepresenter
	include Representable::JSON::Collection
  	items :extend => UserRepresenter
end
