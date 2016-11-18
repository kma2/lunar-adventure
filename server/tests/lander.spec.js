const expect = require('chai');

describe('ship', () => {
	let shipObj;

	beforeEach('create a new ship object', () => {
		shipObj = new Ship({x: 0, y:0})
	})

	describe('ship constructor', () => {
		it('it is a constructor function', () => {
			expect(typeof Ship).toEqual('function')
		})
		it('takes object as input', () => {
			expect(typeof arguments[0]).toEqual('object')
		})
		it('has x and y numbers on the input obj', () => {
			expect(arguments[0].x).to.be.a('number')
			expect(arguments[0].y).to.be.a('number')
		})
		it('returns a new obj', () => {
			expect(typeof shipObj).toEqual('object')
		})
	})

  describe('ship properties', () => {
    it('has a position property with x and y coordinate set to zero', () => {
      expect(typeof shipObj.position).toEqual('object')
      expect(shipObj.position).toEqual(arguments[0])
    })
    it('has a velocity object with x and y coordinate set to zero', () => {
      expect(typeof shipObj.velocity).toEqual('object')
      expect(shipObj.velocity.x).toEqual(0)
      expect(shipObj.velocity.y).toEqual(0)
    })
    it('has a rotation initially set to zero', () => {
      expect(shipObj.rotation).toEqual(0)
    })
    it('has a rotation speed set to 6', () => {
      expect(shipObj.rotationSpeed).toEqual(6)
    })
    it('has inertia property set to 0.99', () => {
      expect(shipObj.inertia).toEqual(0.99)
    })
    it('has gravity property set to 0.0005', () => {
      expect(shipObj.inertia).toEqual(0.0005)
    })

  describe('ship methods', () => {

    beforeEach('create a new ship object', () => {
	  	shipObj = {
        position: {
          x: 0,
          y: 0
        },
        velocity: {
          x: 0,
          y: 0
        },
        rotation: 0,
        rotationSpeed: 6,
        speed: 0.15,
        inertia: 0.99,
        radius: 20
      }
	  })

    describe('rotate', () => {
      it('takes a direction as an argument',() =>{
        expect(typeof arguments[0]).toEqual('string')
      })
      it('subracts rotations speed from rotation if direction is left', () => {
        shipObj.rotate('left')
        expect(shipObj.rotation).toEqual(-6)
      })
      it('adds rotations speed to rotation if direction is right', () => {
        shipObj.rotate('right')
        shipObj.rotate('right')
        expect(shipObj.rotation).toEqual(6)
      })
    })

    describe('accelerate', () => {
      it('subracts from velocity.x, rotation angle times speed', () => {
        // calling with current rotation of 6
        shipObj.accelerate();
        expect(shipObj.velocity.x).toEqual((shipObj.velocity.x - (Math.sin(-1 * shipObj.rotation * (Math.PI/180)))* shipObj.speed))
      })
      it('subracts from velocity.y, rotation angle times speed', () => {
        expect(shipObj.velocity.x).toEqual((shipObj.velocity.y - (Math.cos(-1 * shipObj.rotation * (Math.PI/180)))* shipObj.speed))
      })
    })
  })


  })

})

/*
what do we want to test

- ship constructor exists
- has properties:
	- position (x & y)
	- velocity object
		-speed & direction
		- affected by speed & inertia
	- rotation
	- rotation speed
	- inertia
		- constant
	- gravity
		- constant
- methods:
	- rotate (takes direction)
	- accelerate (takes value)
	-
-context.translate & context.rotate will be run in pixi/gameloop to change pos of ship








*/