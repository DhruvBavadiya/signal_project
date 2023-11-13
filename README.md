# signal_project
# Endpoints

## Add Signal Light Data

- **Route:** `/add-signal-light`
- **Method:** POST
- **Description:** Adds new signal light data to the system.
- **Request Body:**
  - `currentColor` (String): The current color of the traffic signal.
  - Other fields provide details about the signal light.

## Update Signal

- **Route:** `/update-signal/:Id`
- **Method:** PUT
- **Description:** Updates information about a specific signal.
- **Request Parameters:**
  - `Id` (String): The ID of the signal to be updated.
- **Request Body:**
  - Fields to be updated.

## Get All Signals

- **Route:** `/get-signal`
- **Method:** GET
- **Description:** Retrieves information about all signals.

## Get Signal by ID

- **Route:** `/get-signal/:Id`
- **Method:** GET
- **Description:** Retrieves information about a specific signal.
- **Request Parameters:**
  - `Id` (String): The ID of the signal.

## Get Signals by Coordinates

- **Route:** `/get-signal/bycoordinates`
- **Method:** GET
- **Description:** Finds signals based on geographical coordinates.
- **Request Body:**
  - `lat` (Number): Latitude.
  - `lon` (Number): Longitude.
  - `maxDistance` (Number): Maximum distance in kilometers.
