// changes 
// - users can book rooms only if they are actually available; previously, if someone booked a room, for example, in the next year, 
//   that room was blocked and could not be used.
// - when a guest checks out now he/she gets the real price for the room (before a user had to pay only for one day)
// - changed calculateIncome function to calculate income for only one transaction
// - addRoom now checks if a room with given number exists
class Hotel {
    constructor(name) {
        this.name = name;
        this.rooms = [];
        this.bookings = [];
    }

    addRoom(roomNumber, type, price) {
        const foundExistingRoom = this.rooms.filter(
            (room) => room.roomNumber == roomNumber,
        );
        const room = {
            roomNumber,
            type,
            price,
        };

        // it is a good idea to check if room with the given number was not created before
        if (foundExistingRoom.length > 0) {
            throw new Error("room with given number already exists");
        }
        this.rooms.push(room);
    }

    bookRoom(roomNumber, guestName, checkInDate, checkOutDate) {
        const checkInDateParsed = new Date(checkInDate);
        const checkOutDateParsed = new Date(checkOutDate);

        const room = this.rooms.find((r) => r.roomNumber === roomNumber);
        if (!room) throw new Error("Room with given number does not exist");

        // if a guest wants to book a room after/before another guest now it is possible
        // before if someone booked a room in the next year guests could not book it before

        if (
            !this.checkIfRoomIsAvaliable(
                roomNumber,
                checkInDateParsed,
                checkOutDateParsed,
            )
        ) {
            throw new Error("This room is not avaliable");
        }

        const booking = {
            guestName,
            roomNumber,
            checkInDate: checkInDateParsed,
            checkOutDate: checkOutDateParsed,
            price: this.calculateIncome(
                checkInDateParsed,
                checkOutDateParsed,
                room.price,
            ),
        };

        this.bookings.push(booking);
        return booking;
    }

    checkOut(roomNumber, guestName) {
        const bookingIndex = this.bookings.findIndex(
            (b) => b.roomNumber === roomNumber && b.guestName === guestName,
        );
        if (bookingIndex > -1) {
            const booking = this.bookings[bookingIndex];
            const currentDate = new Date();

            if (currentDate <= booking.checkOutDate)
                throw new Error("Guest cannot check out before the check-out date.");

            this.bookings.splice(bookingIndex, 1);
            return booking.price;
        } else {
            throw new Error("No such booking found.");
        }
    }

    listAvailableRooms() {
        const currentDate = new Date();
        const avaliableRooms = [];
        this.rooms.forEach((room) => {
            if (
                this.checkIfRoomIsAvaliable(room.roomNumber, currentDate, currentDate)
            ) {
                avaliableRooms.push(room);
            }
        });
        return avaliableRooms;
    }

    listBookings() {
        return this.bookings;
    }

    checkIfRoomIsAvaliable(roomNumber, checkInDate, checkOutDate) {
        const existingBookings = this.bookings.filter((b) => {
            if (b.roomNumber != roomNumber) return false;
            if (
                (checkOutDate >= b.checkInDate && checkOutDate <= b.checkOutDate) ||
                (checkInDate <= b.checkInDate && checkOutDate >= b.checkOutDate) ||
                (checkInDate >= b.checkInDate && checkInDate <= b.checkOutDate)
            ) {
                return true;
            } else {
                return false;
            }
        });
        return existingBookings.length == 0;
    }

    calculateIncome(checkInDate, checkOutDate, pricePerDay) {
        const duration = (checkOutDate - checkInDate) / (1000 * 3600 * 24);
        return duration * pricePerDay;
    }
}

const fancyHotel = new Hotel("FancyOne");

fancyHotel.addRoom(1, "standard", 200);
fancyHotel.addRoom(2, "premium", 666);
fancyHotel.addRoom(3, "vip", 2137);

fancyHotel.bookRoom(3, "Stefan Iksiński", "2023-11-19", "2023-11-22");
// fancyHotel.bookRoom(3, "Mariusz Stefanowski", "2023-11-20", "2023-11-23");
fancyHotel.bookRoom(3, "Tadeusz Janowski", "2023-11-15", "2023-11-18");
fancyHotel.bookRoom(3, "Tomasz Problem", "2023-11-23", "2023-11-26");

// console.log(fancyHotel.checkOut(3, "Tadeusz Janowski"));
console.log(fancyHotel.listAvailableRooms());
