// VulnerawiseSearch.js - Modular, maintainable search logic
export class VulnerawiseSearch {
  constructor({ inputId, resultId, isModal = false, limit = 5 }) {
    this.input = document.getElementById(inputId);
    if (!this.input) return;
    this.resultId = resultId;
    this.isModal = isModal;
    this.limit = limit;
    this.resultContainer = document.getElementById(resultId);
    if (!this.resultContainer) {
      this.resultContainer = document.createElement('div');
      this.resultContainer.id = resultId;
      this.resultContainer.className = isModal
        ? 'result-container px-3 space-y-2 absolute rounded-3xl top-12 -translate-x-1/2 left-1/2 min-w-[100%] bg-blue z-50'
        : 'result-container p-3 space-y-2 absolute rounded-lg top-10 left-0 min-w-full bg-blue border-slate-700 border z-50';
      this.input.parentNode.appendChild(this.resultContainer);
    }
    this.debounceTimeout = null;
    this.lastResultsHtml = '';
    this.setupEvents();
  }

  getApiBaseUrl() {
    return document.querySelector('meta[name="api-base-url"]')?.content || 'https://api.vulnerawise.ai';
  }

  buildQuery(input) {
    input = input.trim();
    const params = new URLSearchParams();
    if (/^CVE-\d{4}-\d+(,\s*CVE-\d{4}-\d+)*$/i.test(input)) {
      params.set('cve', input.toUpperCase().replace(/\s+/g, ''));
      return params.toString();
    }
    if (/(AND|OR|\(|\))/i.test(input)) {
      params.set('description', input);
      return params.toString();
    }
    const multiPattern = /(\w+)\s*=\s*([\w,-]+)/gi;
    let match;
    let desc = input;
    while ((match = multiPattern.exec(input)) !== null) {
      params.set(match[1].toLowerCase(), match[2]);
      desc = desc.replace(match[0], '').trim();
    }
    if (desc) params.set('description', desc);
    return params.toString();
  }

  async search(isAuto = false) {
    const query = this.input.value.trim();
    if (!query) {
      this.resultContainer.innerHTML = `<p class='px-5 rounded-lg text-black bg-red-200 border border-red-300 text-red-500'>Please enter a search query.</p>`;
      this.resultContainer.style.display = 'block';
      return;
    }
    this.resultContainer.innerHTML = `<p>Searching...</p>`;
    this.resultContainer.style.display = 'block';
    const apiQuery = this.buildQuery(query);
    const apiBase = this.getApiBaseUrl();
    let apiUrl = null;
    if (apiQuery) {
      apiUrl = `${apiBase}/v1/vuln?${apiQuery}&limit=${this.limit}`;
    } else {
      this.resultContainer.innerHTML = '';
      this.resultContainer.style.display = 'none';
      return;
    }
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        if (response.status === 400) {
          if (this.lastResultsHtml) {
            this.resultContainer.innerHTML = this.lastResultsHtml;
          } else {
            this.resultContainer.innerHTML = `<p>No vulnerabilities found.</p>`;
          }
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.data || data.data.length === 0) {
        this.resultContainer.innerHTML = `<p>No vulnerabilities found.</p>`;
        this.lastResultsHtml = '';
        return;
      }
      const html = data.data.map(vul => {
        const cve = vul.cve;
        const maturity = cve.impact?.exploit_maturity || '';
        let desc = cve.description || '';
        if (desc.length > 120) desc = desc.slice(0, 120) + '...';
        return `
          <div class="vulnerability cursor-pointer flex flex-col gap-1 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" onclick="window.location='/cves/${cve.id.toLowerCase()}/'">
            <div class="flex items-center gap-2">
              <span class="cve-id text-black dark:text-white font-poppins font-semibold text-[18px]">${cve.id}</span>
              <span class="font-poppins text-xs px-2 py-0.5 rounded-full bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-200">Exploit Maturity: <span class="font-semibold">${maturity}</span></span>
            </div>
            <span class="font-poppins text-slate-700 dark:text-slate-300 text-sm mt-1 text-left block">${desc}</span>
          </div>
        `;
      }).join("");
      this.resultContainer.innerHTML = html;
      this.lastResultsHtml = html;
    } catch (error) {
      if (this.lastResultsHtml) {
        this.resultContainer.innerHTML = this.lastResultsHtml + `<p class='mt-2 text-red-500'>Error loading vulnerabilities: ${error.message}</p>`;
      } else {
        this.resultContainer.innerHTML = `<p>Error loading vulnerabilities: ${error.message}</p>`;
      }
    }
  }

  setupEvents() {
    this.input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.search(false);
      }
    });
    this.input.addEventListener("input", (event) => {
      const value = this.input.value.trim();
      if (value.length >= 5) {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
          this.search(true);
        }, 2000);
      } else if (value.includes(' ')) {
        const afterSpace = value.split(/\s+/).slice(1).join(' ');
        if (afterSpace.length >= 3) {
          clearTimeout(this.debounceTimeout);
          this.debounceTimeout = setTimeout(() => {
            this.search(true);
          }, 2000);
        } else {
          this.resultContainer.style.display = 'none';
        }
      } else {
        this.resultContainer.style.display = 'none';
      }
    });
    // Hide results on blur, show on focus if there are results
    this.input.addEventListener('blur', () => {
      this.resultContainer.style.display = 'none';
    });
    this.input.addEventListener('focus', () => {
      if (this.resultContainer.innerHTML.trim()) this.resultContainer.style.display = 'block';
    });
  }
}
