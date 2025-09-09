const { MarkovMachine } = require("./markov");

describe("MarkovMachine", function () {

  test("makeChains creates correct chain structure", function () {
    let mm = new MarkovMachine("the cat in the hat");
    
    expect(mm.chains.get("the")).toEqual(expect.arrayContaining(["cat", "hat"]));
    expect(mm.chains.get("cat")).toEqual(["in"]);
    expect(mm.chains.get("in")).toEqual(["the"]);
    expect(mm.chains.get("hat")).toEqual([null]);
  });

  test("makeText returns string of correct length", function () {
    let mm = new MarkovMachine("the cat in the hat");
    let text = mm.makeText(25);
    let words = text.split(" ");
    
    expect(words.length).toBeLessThanOrEqual(25);
  });

  test("makeText only uses words from original text", function () {
    let mm = new MarkovMachine("the cat in the hat");
    let text = mm.makeText();
    let words = text.split(" ");
    
    for (let word of words) {
      expect(["the", "cat", "in", "hat"]).toContain(word);
    }
  });

  test("makeText with empty input", function () {
    let mm = new MarkovMachine("");
    let text = mm.makeText();
    
    expect(text).toBe("");
  });

  test("makeText with single word", function () {
    let mm = new MarkovMachine("hello");
    let text = mm.makeText();
    
    expect(text).toBe("hello");
  });

});

// To run tests, you'll need to install Jest:
// npm install --save-dev jest
// Then add to package.json: "scripts": { "test": "jest" }
