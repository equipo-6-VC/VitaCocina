const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function createUserTest() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
  try {
    const user = {
      name: 'TestUser',
      email: 'testuser@example.com',
      password: 'S4f3_p@ssw0rd',
      isAdmin: true
    };

    // Navegar a la página de registro
    await driver.get('http://localhost:3000/register');

    // Ingresar los datos del usuario
    await driver.findElement(By.name('name')).sendKeys(user.name);
    await driver.findElement(By.name('email')).sendKeys(user.email);
    await driver.findElement(By.name('password')).sendKeys(user.password);
    if (user.isAdmin) {
      await driver.findElement(By.name('isAdmin')).click();
    }
    await driver.findElement(By.css('button[type="submit"]')).click();

    // // Esperar a que aparezca el mensaje de éxito
    // await driver.wait(until.alertIsPresent(), 10000);
    // let alert = await driver.switchTo().alert();
    // let alertText = await alert.getText();
    // console.log(alertText);
    // await alert.accept();
    try {
      await driver.wait(until.alertIsPresent(), 5000);
      const alert = await driver.switchTo().alert();
      const alertText = await alert.getText();
      console.log("Texto de la alerta:", alertText);
      await alert.accept();
    } catch (error) {
      console.error("No se detectó ninguna alerta:", error.message);
    }

    // Verificar que el usuario puede iniciar sesión después de registrarse
    await driver.get('http://localhost:3000/login');
    await driver.findElement(By.name('email')).sendKeys(user.email);
    await driver.findElement(By.name('password')).sendKeys(user.password);
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Esperar a que aparezca el mensaje de éxito
    try {
      await driver.wait(until.alertIsPresent(), 5000);
      const alert = await driver.switchTo().alert();
      const alertText = await alert.getText();
      console.log("Texto de la alerta:", alertText);
      await alert.accept();
    } catch (error) {
      console.error("No se detectó ninguna alerta:", error.message);
    }

  } finally {
    await driver.quit();
  }
})();