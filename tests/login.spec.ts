// Playwright에서 test(테스트 정의)와 expect(검증) 기능을 가져옵니다.
import { test, expect } from '@playwright/test';
// describe: 관련 테스트를 묶는 그룹 (TC의 "기능 분류"와 같음)
test.describe('로그인 기능', () => {
// 테스트 이름에 TC ID를 넣으면 실패했을 때 어떤 TC인지 바로 찾을 수 있습니다.
test('TC-LOGIN-001 유효한 계정으로 로그인하면 상품 목록으로 이동한다', async ({ page }) => {
// [Arrange] 사전 조건: 로그인 페이지로 이동
await page.goto('https://www.saucedemo.com/');
// [Act] 테Get-ChildItem tests스트 절차: 아이디/비밀번호 입력 후 로그인 클릭
await page.getByPlaceholder('Username').fill('standard_user');
await page.getByPlaceholder('Password').fill('secret_sauce');
await page.getByRole('button', { name: 'Login' }).click();
// [Assert] 기대 결과: URL과 화면 제목을 "구체적으로" 확인
await expect(page).toHaveURL(/inventory\.html/);
await expect(page.locator('.title')).toHaveText('Products');
});
test('TC-LOGIN-002 잠긴 계정으로 로그인하면 에러 메시지가 표시된다', async ({ page }) => {
// [Arrange]
await page.goto('https://www.saucedemo.com/');
// [Act]
await page.getByPlaceholder('Username').fill('locked_out_user');
await page.getByPlaceholder('Password').fill('secret_sauce');
await page.getByRole('button', { name: 'Login' }).click();
// [Assert] 에러 영역에 'locked out' 문구가 포함되어 있는지 확인
await expect(page.locator('[data-test="error"]')).toContainText('locked out');
});
test('TC-LOGIN-003  아이디를 비우고 비밀번호만 입력 후 Login', async ({ page }) => {
// [Arrange]
await page.goto('https://www.saucedemo.com/');
// [Act]
await page.getByPlaceholder('Username').fill('');
await page.getByPlaceholder('Password').fill('secret_sauce');
await page.getByRole('button', { name: 'Login' }).click();
// [Assert] 에러 영역에 'locked out' 문구가 포함되어 있는지 확인
await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
});
});