<template>
  <div class="about">
    <h1>About...</h1>
    <div class="text">
      <h3>About this App</h3>
      <p>
      This App is developed by <em>Wanjun Ai</em>, and is intended to be an announcement of the Chongqing Geometry Symposium. We hope that it will provide some convenient for communication of the latest advances in geometry and analysis.</p>
      <h3>About the markdown syntax</h3>
      <p>
      The markdown is rendered by <a href="https://www.npmjs.com/package/markdown-it-texmath">markdown-it-texmath</a>, which is based on <a href="https://github.com/markdown-it/markdown-it">markdown-it</a> and <a href="https://github.com/KaTeX/KaTeX">Katex</a>. The markdown syntax can be found at this live <a href="https://markdown-it.github.io">demo</a>.
      </p>
      <h3>About the math input</h3>
      <p>
        The mathematical formula is proceeded by <a href="https://github.com/KaTeX/KaTeX">Katex</a>, it is a fast math render. We should enclose our math formula in <em>$</em> or <em>$$</em> for inline/display math respectively.
      </p>
      <h3>Technical support</h3>
      <p>
      If you have any questions, please contact the support team at:
      <br>
      Wanjun, Ai: van141.abel(at)gmail.com.
      </p>
    </div>
  </div>
</template>
<style scoped>
  .text {
    text-align:justify;
    font-size: 1.15rem;
    width: 80%;
    margin: 0 auto;
    padding-top: 1.5rem;
  }
</style>
