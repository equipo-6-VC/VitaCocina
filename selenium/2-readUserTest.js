const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async function readUserTest() {
  let driver = await new Builder().forBrowser("chrome").setChromeOptions(new chrome.Options()).build();

  try {
    const user = {
      name: "TestUser",
      email: "testuser@example.com",
      password: "S4f3_p@ssw0rd",
    };

    // Navegar a la página de inicio de sesión
    await driver.get("http://localhost:3000/login");

    // Ingresar el correo electrónico y la contraseña
    await driver.findElement(By.name("email")).sendKeys(user.email);
    await driver.findElement(By.name("password")).sendKeys(user.password);
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Esperar a que la alerta esté presente y aceptarla si aparece
    try {
      await driver.wait(until.alertIsPresent(), 5000);
      const alert = await driver.switchTo().alert();
      const alertText = await alert.getText();
      console.log("Texto de la alerta:", alertText);
      await alert.accept();
    } catch (error) {
      console.error("No se detectó ninguna alerta:", error.message);
    }

    // Verificar que el token se ha almacenado correctamente
    await driver.sleep(1000); // Esperar un momento para asegurarse de que el token se almacene
    const token = await driver.executeScript("return localStorage.getItem('authToken');");
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    // Navegar a la página de perfil de usuario
    await driver.get("http://localhost:3000/user");

    // Esperar hasta que el texto del usuario esté visible
    await driver.wait(until.elementLocated(By.id("bienvenido")), 10000);

    // Verificar que el elemento esté visible
    const userNameElement = await driver.findElement(By.id("bienvenido"));
    const isDisplayed = await userNameElement.isDisplayed();
    if (!isDisplayed) {
      throw new Error("El nombre del usuario no está visible");
    }

    console.log("El nombre del usuario está visible en la página");

  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    await driver.quit();
  }
})();
