const template = document.createElement("div");
template.innerHTML = /*html*/ `
<footer ">
    <div class=" ">
        <nav >
            <ul class=" ">
                <li class=" ">
                    <a class=" ">
                        الرئيسية
                    </a>
                </li>
                <li class="about" id="about">
                    <a routerLink="/About">
                        من نحن
                    </a>
                </li>
                <li class=" ">
                    <a routerLink="/Contact">
                        اتصل بنا
                    </a>
                </li>
                <li class=" ">
                    <a href="/ar/terms-and-conditions.html" rel="nofollow" class=" ">
                        الشروط والأحكام                         </a>
                </li>
                <li class=" ">
                    <a href="/ar/privacy-policy.html" rel="nofollow" class=" ">
                        سياسة الخصوصية                         </a>
                </li>
                <li class=" ">
                    <a href="." rel="nofollow" class=" ">
                        دخول العميل                            </a>
                </li>
                <li class=" ">
                    <a href="https://www.propertyfinder.ae/company-registration/ar/" rel="nofollow" class=" ">
                        الوسطاء العقاريون                            </a>
                </li>
            </ul>
        </nav>
        <div class=" ">
            <div class=" ">
                <div class=" ">
                    <p class=" ">
                        حلب هال
                        2017 &copy;
                        - كافة الحقوق محفوظة
                    </p>
                </div>
            </div>
        </div>
    </div>
</footer>
`;
export class FooterIns extends HTMLElement {
	constructor() {
		super();
		//        this.sh_r = this.attachShadow({ 'mode': 'open' });
		//        this.sh_r.appendChild(template.content.cloneNode(true));
		this.sh_r = this.appendChild(template.cloneNode(true));
	}
}

export default FooterIns;

//window.customElements.define("footer-ins", FooterIns);