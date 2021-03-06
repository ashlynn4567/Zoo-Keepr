const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require("../lib/zookeepers.js");

jest.mock("fs");

test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        {name: "Tiffany", id: "abcdefgh"},
        []
    );

    expect(zookeeper.name).toBe("Tiffany");
    expect(zookeeper.id).toBe("abcdefgh");
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "2",
            name: "Tiffany",
            age: 28,
            favoriteAnimal: "iguana",
        },
        {
            id: "3",
            name: "Isabella",
            age: 33,
            favoriteAnimal: "bear",
        },
    ];

    const updatedZookeepers = filterByQuery({ age: 33 }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [
        {
            id: "2",
            name: "Tiffany",
            age: 28,
            favoriteAnimal: "iguana",           
        }, 
        {
            id: "3",
            name: "Isabella",
            age: 33,
            favoriteAnimal: "bear",            
        },
    ];

    const result = findById("3", startingZookeepers);

    expect(result.name).toBe("Isabella");
});

test("validates age", () => {
    const zookeeper = {
        id: "2",
        name: "Tiffany",
        age: 28,
        favoriteAnimal: "iguana",        
    };

    const invalidZookeeper = {
        id: "2",
        name: "Tiffany",
        age: "28",
        favoriteAnimal: "iguana",       
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});