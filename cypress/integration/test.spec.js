let website = "https://ecol-frontend-heroku.herokuapp.com/";
let validEmail = "testaccount@gmail.com";
let validPassword = "testAccount1";
let invalidEmail = "invalid@gmail.com";
let invalidPassword = "invalid";

function emailGenerator() {
  let chars = "abcdefghijklmnopqrstuvwxyz1234567890";
  let string = "";
  for (let ii = 0; ii < 15; ii++) {
    string += chars[Math.floor(Math.random() * chars.length)];
  }
  return string + "@gmail.com";
}

function beforeSignUp() {
  cy.visit(website);
  cy.viewport("macbook-15");
  cy.get(".buttonLogin").click();
  cy.get("span").contains("SignUp").click();
}

describe("Sign Up Component", function () {
  it("Sign Up With Valid Email Will Log The User In Homepage", function () {
    // Arrange
    cy.visit(website);
    cy.viewport("macbook-15");
    cy.get(".buttonLogin").click();
    // Act
    cy.get("span").contains("SignUp").click();
    // Assert
    cy.get(".signUpButton").should("have.text", "Sign Up");
  });
  it("Sign Up Button Should Not Be Clickable When Empty", function () {
    // Arrange
    beforeSignUp();
    // Act
    cy.get(".emailInput").find("input").type("email@code.berlin");
    // Assert
    cy.get(".MuiButton-root").should("have.class", "Mui-disabled");
  });
  it("When Forms are all filled, button should be clickable", function () {
    // Arrange
    beforeSignUp();
    // Act
    cy.get(".emailInput").find("input").type(emailGenerator());
    cy.get(".passwordInput").find("input").type(validPassword);
    cy.get(".firstNameInput").find("input").type("First Name");
    cy.get(".lastNameInput").find("input").type("Last Name");
    // Assert
    cy.get(".MuiButton-root").should("not.have.class", "Mui-disabled");
  });

  it("When Password do not match criteria, show erorr", function () {
    // Arrange
    beforeSignUp();
    // Act
    cy.get(".emailInput").find("input").type(emailGenerator());
    cy.get(".passwordInput").find("input").type(invalidPassword);
    cy.get(".firstNameInput").find("input").type("First Name");
    cy.get(".lastNameInput").find("input").type("Last Name");
    cy.get(".signUpButton").click();

    // Assert
    cy.get(".invalidPasswordError").should("exist");
  });
  it("Sign Up will register your email!", function () {
    // Arrange
    beforeSignUp();
    let store_email = emailGenerator();
    // Act
    cy.get(".emailInput").find("input").type(store_email);
    cy.get(".passwordInput").find("input").type(validPassword);
    cy.get(".firstNameInput").find("input").type("First Name");
    cy.get(".lastNameInput").find("input").type("Last Name");
    cy.get(".signUpButton").click();
    cy.wait(3000);
    // Assert
    cy.get(".currentUserEmail").should("have.text", store_email);
  });
});

describe("Sign In Component", function () {
  it("Inclomplete input makes button not clickable", function () {
    cy.visit(website);
    cy.viewport("macbook-15");
    cy.get(".buttonLogin").click();
    cy.get(".MuiButton-root").should("have.class", "Mui-disabled");
    cy.get(".emailInput").find("input").type("email@code.berlin");
    cy.get(".MuiButton-root").should("have.class", "Mui-disabled");
    cy.get(".emailInput").find("input").focus().clear();
    cy.get(".passwordInput").find("input").type("email@code.berlin");
    cy.get(".MuiButton-root").should("have.class", "Mui-disabled");
  });
  it("Complete input makes button clickable", function () {
    cy.visit(website);
    cy.viewport("macbook-15");
    cy.get(".buttonLogin").click();
    cy.get(".MuiButton-root").should("have.class", "Mui-disabled");
    cy.get(".emailInput").find("input").type("email@code.berlin");
    cy.get(".passwordInput").find("input").type("email@code.berlin");
    cy.get(".MuiButton-root").should("not.have.class", "Mui-disabled");
  });
  it("Inputting value in sign in form update state", function () {
    cy.visit(website);
    cy.viewport("macbook-15");
    cy.get(".buttonLogin").click();
    cy.get(".emailInput").find("input").type("email@code.berlin");
    cy.get(".emailInput")
      .find("input")
      .should("have.value", "email@code.berlin");
    cy.get(".passwordInput").find("input").type("password");
    cy.get(".passwordInput").find("input").should("have.value", "password");
  });
  it("Sign In With Valid Email will display email address", function () {
    cy.visit(website);
    cy.viewport("macbook-15");
    cy.get(".buttonLogin").click();
    cy.get(".emailInput").type(validEmail);
    cy.get(".passwordInput").type(validPassword);
    cy.get(".signInButton").click();
    cy.wait(3000);
    cy.get(".currentUserEmail").should("have.text", validEmail);
  });
  it("Sign In With Invalid Email Shows Invalid", function () {
    cy.visit(website);
    cy.viewport("macbook-15");
    cy.get(".buttonLogin").click();
    cy.get(".emailInput").type(invalidEmail);
    cy.get(".passwordInput").type(invalidPassword);
    cy.get(".signInButton").click();
    cy.get(".loginError").should(
      "have.text",
      "Username and password do not match or you do not have an account yet"
    );
  });
});

describe("Integration Full Account", function () {
  it("Can Sign Up then Sign In", function () {
    // Arrange
    beforeSignUp();
    let store_email = emailGenerator();

    // Act Sign UP
    cy.get(".emailInput").find("input").type(store_email);
    cy.get(".passwordInput").find("input").type(validPassword);
    cy.get(".firstNameInput").find("input").type("First Name");
    cy.get(".lastNameInput").find("input").type("Last Name");
    cy.get(".signUpButton").click();
    cy.wait(3000);
    // Logout and Sign In Again
    cy.get(".buttonLogout").click();
    cy.get(".buttonLogin").click();
    cy.get(".emailInput").type(store_email);
    cy.get(".passwordInput").type(validPassword);
    cy.get(".signInButton").click();
    cy.wait(3000);

    // Assert
    cy.get(".currentUserEmail").should("have.text", store_email);
  });
});
