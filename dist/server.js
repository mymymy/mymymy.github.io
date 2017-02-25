var Hapi = require('hapi')
var Joi = require('joi')
var Boom = require('boom')
var Inert = require('inert')

var server = new Hapi.Server()

server.connection({ host: '0.0.0.0', port: +process.env.PORT || 8000 })

server.register([Inert], function (err) {
	server.route([
		{
			method: 'GET',
			path: '/{page?}',
			config: {
				validate: {
					params: {
						page: Joi.string().regex(/\.html$/).optional()
					}
				}
			},
			handler: function (request, reply) {
				
				reply.file('./dist/'+ (request.params.page || 'index.html'))
			}
		},
		{
			method: 'GET',
			path: '/assets/{p*}',
			handler: {
				directory: {
					path: './dist/assets/'
				}
			}
		}
	])

	server.start(function () {

		console.log(server.info.uri)
	})
})