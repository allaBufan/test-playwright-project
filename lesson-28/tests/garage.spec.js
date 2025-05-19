import { test, expect, request as apiRequest } from '@playwright/test';

test('API REQUEST: Create car - successful 201', 
  {
    tag: '@post-api',
  }, async({ baseURL, page, httpCredentials }) => {

    // apiRequest creates new context
    const apiClient = await apiRequest.newContext({ httpCredentials });

    const loginResp = await apiClient.post('/api/auth/signin', { data: {
      email: 'hillel-1@aaa.com',
      password: 'testHillel1!'
    } });

    const loginData = await loginResp.json();
    console.log('Login response:', loginData);

    const allCookies = (await page.context().cookies()).reduce((acc, curr) => {
        return `${acc} ${curr.name}=${curr.value};`;
      }, '');
      console.log(allCookies);

    const createCar =  await apiClient.post('/api/cars', { data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 122
      }, headers: {
        cookie: allCookies
      } });

      const createCarData = await createCar.json();
      console.log('Create car response:', createCarData);

      // Check response status
      expect(createCar.status()).toBe(201); 
      
});

test('API REQUEST: Create car - failed 404: Brand not found', 
  {
    tag: '@post-api',
  }, async({ baseURL, page, httpCredentials }) => {

    // apiRequest creates new context
    const apiClient = await apiRequest.newContext({ httpCredentials });

    const loginResp = await apiClient.post('/api/auth/signin', { data: {
      email: 'hillel-1@aaa.com',
      password: 'testHillel1!'
    } });

    const loginData = await loginResp.json();
    console.log('Login response:', loginData);

    const allCookies = (await page.context().cookies()).reduce((acc, curr) => {
        return `${acc} ${curr.name}=${curr.value};`;
      }, '');
      console.log(allCookies);

    const createCar =  await apiClient.post('/api/cars', { data: {
        carBrandId: 999,
        carModelId: 1,
        mileage: 122
      }, headers: {
        cookie: allCookies
      } });

      
    const createCarData = await createCar.json();
    console.log('Create car response:', createCarData);

    // Check response status
    expect(createCar.status()).toBe(404); 

    // Checks error
    expect(createCarData.status).toBe('error'); 
    expect(createCarData.message).toBe('Brand not found'); 
});

test('API REQUEST: Create car - failed 404: Not found', 
  {
    tag: '@post-api',
  }, async({ baseURL, page, httpCredentials }) => {

    // apiRequest creates new context
    const apiClient = await apiRequest.newContext({ httpCredentials });

    const loginResp = await apiClient.post('/api/auth/signin', { data: {
      email: 'hillel-1@aaa.com',
      password: 'testHillel1!'
    } });

    const loginData = await loginResp.json();
    console.log('Login response:', loginData);

    const allCookies = (await page.context().cookies()).reduce((acc, curr) => {
        return `${acc} ${curr.name}=${curr.value};`;
      }, '');
      console.log(allCookies);

    const createCar =  await apiClient.post('/api/bars', { data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 122
      }, headers: {
        cookie: allCookies
      } });

      const createCarData = await createCar.json();
      console.log('Create car response:', createCarData);

      // Check response status
      expect(createCar.status()).toBe(404); 
      
});

