class Hotel {
    constructor(name) {
        this.name = name;
        this.rooms = [];
        this.bookings = [];
    }

    addRoom(roomNumber, type, price) {
        const room = {
            roomNumber,
            type,
            price,
            isAvailable: true
        };
        this.rooms.push(room);
    }

    bookRoom(roomNumber, guestName, checkInDate, checkOutDate) {
        const room = this.rooms.find(r => r.roomNumber === roomNumber && r.isAvailable);
        if (room) {
            room.isAvailable = false;
            const booking = {
                guestName,
                roomNumber,
                checkInDate: new Date(checkInDate),
                checkOutDate: new Date(checkOutDate),
                price: room.price
            };
            this.bookings.push(booking);
            return booking;
        } else {
            throw new Error('Room is not available.');
        }
    }

    checkOut(roomNumber, guestName) {
        const bookingIndex = this.bookings.findIndex(b => b.roomNumber === roomNumber && b.guestName === guestName);
        if (bookingIndex > -1) {
            const booking = this.bookings[bookingIndex];
            const currentDate = new Date();
            if (currentDate >= booking.checkOutDate) {
                // Room becomes available again
                const room = this.rooms.find(r => r.roomNumber === roomNumber);
                room.isAvailable = true;
                this.bookings.splice(bookingIndex, 1);
                return booking.price;
            } else {
                throw new Error('Guest cannot check out before the check-out date.');
            }
        } else {
            throw new Error('No such booking found.');
        }
    }

    listAvailableRooms() {
        return this.rooms.filter(room => room.isAvailable);
    }

    listBookings() {
        return this.bookings;
    }

    calculateIncome() {
        return this.bookings.reduce((acc, booking) => {
            const duration = (new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / (1000 * 3600 * 24);
            return acc + (booking.price * duration);
        }, 0);
    }
}

