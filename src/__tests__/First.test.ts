describe("First", () => {
  it("must be possible sum two numbers", () => {
    expect(2 + 2).toBe(4);
  });

  it("must be possible sum two numbers and return error", () => {
    expect(2 + 2).not.toBe(5);
  });
});
