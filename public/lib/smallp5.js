"use strict"

class Sketch {
    constructor (w, h) {
        this.canvas = document.querySelector('canvas');
        this.canvas.width = w;
        this.canvas.height = h;
        this.ctx = this.canvas.getContext('2d'); 
        this.ctx.strokeStyle = 'black';
        this.ctx.save();
        this.canvas.addEventListener("mousemove", this.getMousePos);
        this.canvas.addEventListener("mousedown", this.setMouseDown);
        this.canvas.addEventListener("mouseup", this.setMouseUp);
        this.canvas.addEventListener("touchstart", this.setTouchDown);
        this.canvas.addEventListener("touchend", this.setTouchUp);
    }

    getMousePos(e) {
        sysVar.mouseX = e.offsetX;
        sysVar.mouseY = e.offsetY;
    }

    setMouseDown() {
        sysVar.mouseStatus = 1;
    }

    setMouseUp() {
        sysVar.mouseStatus = 2;
    }

    setTouchDown(e) {
        sysVar.mouseStatus = 1;
        sysVar.mouseX = e.targetTouches[0].pageX - e.target.getBoundingClientRect().left;
        sysVar.mouseY = e.targetTouches[0].pageY - e.target.getBoundingClientRect().top;
        e.preventDefault();
    }

    setTouchUp(e) {
        sysVar.mouseStatus = 2;
    }


    isMouseDown() {
        if (sysVar.mouseStatus == 1) {
            return true;
        } else {
            return false;
        }
    }

    isMouseUp() {
        if (sysVar.mouseStatus == 2) {
            sysVar.mouseStatus = 0;
            return true;
        } else {
            return false
        };
    }

    /**
     * saves current drawing style
     */
    push() {
        this.ctx.save();
    }

    /**
     * restores current drawing style
     */
    pop() {
        this.ctx.restore();
    }

    /**
     * horizontal and vertical movement in canvas
     * @param {Number} x 
     * @param {Number} y 
     */
    translate(x, y) {
        this.ctx.translate(x, y);
    }

    /**
     * rotates canvas with angle
     * @param {Number} n angle in radians 
     */
    rotate(n) {
        this.ctx.rotate(n);
    }
    
    /**
     * set fillcolor
     * @param {String} color 
     */
    fill(color) {
        this.ctx.fillStyle = color;
    }

    /**
     * set strokecolor
     * @param {String} color 
     */
    stroke(color) {
        this.ctx.strokeStyle = color;
    }

    /**
     * set weight  
     * @param {Number} w Weight 
     */
    strokeWeight(w) {
        this.ctx.lineWidth = w;
    }

    /**
     * sets backgroundcolor of canvas
     * @param {String} color (optional)
     */
    background(color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    }

    /**
     * Drawing an rectangle
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} w 
     * @param {Number} h 
     */
    rect(x, y, w, h) {
        this.ctx.strokeRect(x, y, w, h);
    }

    rectFilled(x, y, w, h) {
        this.ctx.fillRect(x, y, w, h);
    }


    /**
     * Drawing a line
     * @param {Number} x1 
     * @param {Number} y1 
     * @param {Number} x2 
     * @param {Number} y2 
     */
    line(x1, y1, x2, y2) {
        const path = new Path2D();
        path.moveTo(x1, y1);
        path.lineTo(x2,y2);
        path.closePath();
        this.ctx.stroke(path);    
    }
    /**
     * Drawing an triangle
     * @param {Number} x1 
     * @param {Number} y1 
     * @param {Number} x2 
     * @param {Number} y2 
     * @param {Number} x3 
     * @param {Number} y3 
     */
    triangle(x1, y1, x2, y2, x3, y3) {
        const path = new Path2D();
        path.moveTo(x1, y1);
        path.lineTo(x2, y2);
        path.lineTo(x3, y3);
        path.closePath();
        this.ctx.stroke(path);

    }

    /**
     * Drawing an circle
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} radius 
     */
    circle(x, y, radius) {
        const path = new Path2D();
        path.arc(x, y, radius, 0, 2 * Math.PI);
        path.closePath();
        this.ctx.stroke(path);    
    }

    circleFilled(x, y, radius) {
        const path = new Path2D();
        path.arc(x, y, radius, 0, 2 * Math.PI);
        path.closePath();
        this.ctx.fill(path);    
    }

    /**
     * starts internal reDraw as animationframe. reDraw
     * calls function fnDraw (get by parameter)
     * @param {function} fnDraw 
     */
    startAnimation (fnDraw) {
        let draw = fnDraw;

        let reDraw = () => {
            draw();
            //recursiv Call to continue
            window.requestAnimationFrame(reDraw); 
        }
        //start animation with redraw
        window.requestAnimationFrame(reDraw);
    }

    /**
     * Randomnumber between n1 and n2 (exclusive)
     * @param {Number} n1 
     * @param {Number} n2 (exclusive)
     * @return {Number}
     */
    random(n1, n2) {
        return Math.floor(Math.random()* (n2 - n1) + n1);
    }

    /**
     * constrain value between min and max
     * @param {Number} v value
     * @param {Number} min 
     * @param {Number} max 
     * @return {Number}
     */
    constrain(v, min, max) {
        return (Math.min(max, Math.max(min, v)));
    }

    /**
     * @param {Number} x 
     * @param {Number} y 
     */
    createVector(x, y) {
        return new Vector(x, y);
    }

    /**
     * adds two vectors and returns the new vector
     * @param  {Vector} v1   the first vector to add
     * @param  {Vector} v2   the second vector to add
     * @return {Vector} a new vector  
     */
    addVector(v1, v2) {
        let vadd = new Vector(0, 0);
        vadd.x = v1.x + v2.x;
        vadd.y = v1.y + v2.y;
        return vadd;
    }

    /**
     * subtracts v2 from v1 and returns a new vector
     * @param  {Vector} v1   from vector 
     * @param  {Vector} v2   subtract vector
     * @return {Vector} a new vector  
     */
    subVector(v1, v2) {
        let vsub = new Vector(0, 0);
        vsub.x = v1.x - v2.x;
        vsub.y = v1.y - v2.y;
        return vsub;
    }

    /**
     * Multiply the vector by a scalar
     * @param {Vector} v
     * @param {Number} n
     * @returns {Vector} multiplied Vector 
     */
    multVector(v, n) {
        let vmult = v.copy();
        vmult.x *= n;
        vmult.y *= n;
        return vmult;
    }

    /**
     * Divide the vector by a scalar 
     * @param {Vector} v
     * @param {Number} n 
     * @returns {Vector} divided Vector
     */
    divVector(v, n) {
        let vdiv = v.copy();
        vdiv.x /= n;
        vdiv.y /= n;
        return vdiv;
    }

    /**
     * Calculates the dot product of two vectors  
     * @param {Vector} v1 
     * @param {Vector} v2 
     * @returns {Number} dotproduct (scalar)
     */
    dotVector(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }
}

class Vector {
    /**
     * create a Vector
     * @param  {Number} x   the x component of the vector
     * @param  {Number} y   the y component of the vector     
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;       
    }
    
    /** 
     * Sets the x and y component of the vector 
     * @param {Number} x the x component of the vector
     * @param {Number} y the y component of the vector
    */
    set(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Gets a copy of the vector
     * @return {Vector} the copy of the vector
    */
    copy() {
        return new Vector(this.x, this.y);
    }
      
    /**
     * adds a vector to this vector
     * @param  {Vector} v   the vector to add
     */
    add(v) {
        this.x += v.x;
        this.y += v.y; 
    } 

    /**
     * subtracts a vector from this vector
     * @param  {Vector} v   the subtracting vector
     */
    sub(v) {
        this.x -= v.x;
        this.y -= v.y; 
    } 

    /**
     * Calculates the squared magnitude of the vector and returns the result
     * @return {Number} Sqare of x and y from vector
     */
    magSq() {
        return this.x * this.x + this.y * this.y
    }

    /**
     * Calculates the magnitude (length) of the vector and returns the result
     * @return {Number} magnitude
     */
    mag() {
        return Math.sqrt(this.magSq());
    }

    /**
     * Calculates the Euclidean distance between this and another vector
     * @param {Vector} v the vector to calculate the distance
     * @return {Number} distance
     */
    dist(v) {
        const vdist = Vector.sub(v, this);
        return vdist.mag();
    }

    /**
     * Multiply the vector by a scalar
     * @param {Number} n 
     */
    mult(n) {
        this.x *= n;
        this.y *= n;
    }

    /**
     * Divide the vector by a scalar
     * @param {Number} n 
     */
    div(n) {
        this.x /= n;
        this.y /= n;
    }

    /**
     * Normalize the Vector to length 1
     */
    normalize() {
        const len = this.mag();
        if (len != 0) {
            this.div(len);
        }
    }

    /**
     * Limit the magnitude of this vector
     * @param {Number} max maximal magnitude
     */
    limit(max) {
        const mSq = this.magSq();
        if (mSq > max * max) {
          this.normalize();
          this.mult(max);
        }
      
    }
    /**
     * set the magnitude of an vector
     * @param {Number} magnitude 
     */
    setMag(magnitude) {
        this.normalize();
        this.mult(magnitude);
    }

    /**
     * Calculates the dot product with vector v
     * @param {Vector} v 
     * @returns {Number} dotproduct (scalar)
     */
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    
    /**
     * Calculates angle (Polar Coordinates)
     * @returns {Number} angle in radian
     */
    heading() {
        const h = Math.atan2(this.y, this.x);
        return h;
    }
    /**
     * rotates this vector by an angle
     * @param {Vector} base basis of rotation
     * @param {Number} n angle in radians
     */
    rotate(base, n) {
        const direction = this.copy();
        direction.sub(base);
        const newHeading = direction.heading() + n;
        const magnitude = direction.mag();
        this.x = base.x + Math.cos(newHeading) * magnitude;
        this.y = base.y + Math.sin(newHeading) * magnitude;
    }
    /**
     * rotates this vector by an angle
     * @param {Vector} base basis of rotation
     * @param {Number} n angle in radians
     */
    rotateMatrix(base, n) {
        const direction = this.copy();
        direction.sub(base);
        const x = direction.x * Math.cos(n) - direction.y * Math.sin(n);
        const y = direction.x * Math.sin(n) + direction.y * Math.cos(n);
        this.x = x + base.x;
        this.y = y + base.y; 
    }

    /**
     * Calculates the angle between this and v
     * @param {Vector} v 
     * @returns {Number} angle in radian
     */
    angleBetween(v) {
        const dotmagmag = this.dot(v) / (this.mag() * v.mag());
        // Mathematically speaking: the dotmagmag variable will be between -1 and 1
        // inclusive. Practically though it could be slightly outside this range due
        // to floating-point rounding issues. This can make Math.acos return NaN.
        //
        // Solution: we'll clamp the value to the -1,1 range
        const angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
        return angle;
    }
}

export const sysVar = {
    mouseX : 0,
    mouseY : 0,
    mouseStatus : 0,
}

export const SketchFactory = {
    instance: null,

    /**
     * creates only one instance of Class Sketch
     * @return {Sketch} instance 
     * @param {Number} w width of canvas
     * @param {Number} h height of canvas
     */
    makeInstance(w, h) {
        if (this.instance == null) {
            this.instance = new Sketch(w, h);
        }
        return this.instance;
    }
}
