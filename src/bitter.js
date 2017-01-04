function Bitter(data) {
    this.data = data || [];
}

/**
 * Return the number of bytes in this Bitter instance.
 */
Bitter.prototype.len = function() {
    return 4 * this.data.length;
};

Bitter.prototype.byteAt = function(index) {
    if (index >= this.len()) {
        throw new RangeError();
    }

    var byteOffset = index % 4;
    var byteIndex = Math.floor(index / 4);

    // Extract the 8-bit sequence from the 32-bit integer using
    //   unsigned bit shifts.
    return (((0xff000000 >>> (8 * byteOffset)) & this.data[byteIndex]) >>>
            (8 * (3 - byteOffset)));
};

/**
 * Return the bit at the given index.
 * @throw RangeError if the index is beyond the stored data bounds.
 */
Bitter.prototype.bitAt = function(index, bitIndex) {
    if (bitIndex == undefined) {
        bitIndex = index % 8;
        index = Math.floor(index / 8);
    }

    // Check if this bit is within our data bounds.
    if (index >= this.len()) {
        throw new RangeError();
    }

    // Check if the bit at the given index is set
    if (this.byteAt(index) & (0x80 >> bitIndex)) {
        return true;
    }

    return false;
};
