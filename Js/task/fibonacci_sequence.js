const fs = require("fs");

function generateFibonacci(length) {
  const sequence = [0, 1];
  for (let i = 2; i < length; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  return sequence;
}

function saveToCSV(input, sequence) {
  const csvContent = `${input},${sequence.join(",")}\n`;
  fs.appendFileSync("fibonacci_sequence.csv", csvContent, (err) => {
    if (err) {
      console.error("Error writing to file:", err.message);
    }
  });
  console.log(`Fibonacci sequence of length ${input} saved to CSV.`);
}

console.log("Enter the length of the Fibonacci sequence:");
process.stdin.once("data", async (input) => {
  try {
    const length = parseInt(input);
    if (!isNaN(length) && length > 0) {
      fs.readFile(
        "fibonacci_sequence.csv",
        { encoding: "utf-8" },
        (err, data) => {
          console.log(data);
          if (err) {
            console.error("Error reading file:", err.message);
            return;
          }
          const lines = data
            .trim()
            .split("\n")
            .map((line) => line.split(",")[0]);
          if (lines.includes(length.toString())) {
            console.log(
              `Fibonacci sequence of length ${length} is already in CSV.`
            );
            return;
          }
          const sequence = generateFibonacci(length);
          saveToCSV(length, sequence);
        }
      );
    } else {
      console.log("Invalid input. Please enter a positive integer.");
      return;
    }
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    process.stdin.destroy();
  }
});
