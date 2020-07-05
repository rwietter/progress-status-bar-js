// função que cria os elementos e obtém a referência do container que se aplica o height máximo
const getElementsHTML = () => {
  const MAX_HEIGHT_WRAPPER = document.querySelector('.main');
  const createStyleBar = document.createElement('span');
  const createContainerStyleBar = document.createElement('div');
  return [MAX_HEIGHT_WRAPPER, createStyleBar, createContainerStyleBar];
}

// adiciona estilos ao elemento bar e adiciona ele e o seu container no corpo do body
const createIncrementStyleBar = (contextStyleBar, containerStyleBar) => {
  const styles = [
    `height: 4px;
    background-color: rgb(102, 51, 204);
    position: fixed;
    top: 0px;
    left: 0px;
    transition: all 0.5s ease-out 0s;
    width: 0;`
  ]
  contextStyleBar.style = styles;
  document.body.appendChild(containerStyleBar);
  containerStyleBar.appendChild(contextStyleBar);
  return contextStyleBar;
}

// atualiza a porcentagem de largura da barra de status
const updateContextHeightStyleBar = (styleBarElement, MAX_HEIGHT_WRAPPER) => {
  const MAX_HEIGHT_CONTEXT = MAX_HEIGHT_WRAPPER.offsetHeight;
  const getPositionYOffScroll = window.pageYOffset;

  const updateStyleBarElementWidth = Math.ceil((getPositionYOffScroll * 110) / MAX_HEIGHT_CONTEXT);

  window.localStorage.setItem('widthStyleBar', updateStyleBarElementWidth);

  if (updateStyleBarElementWidth === 100)
    return;
  
  return styleBarElement.style.width = `${updateStyleBarElementWidth}%`;
}

// pega o corpo dos elementos do body, do container e da style bar
const [MAX_HEIGHT_WRAPPER, createStyleBar, containerStyleBar] = getElementsHTML();

// passa o elemento de bar e o container e retorna o elemento já encorporado ao html
const styleBarElement = createIncrementStyleBar(createStyleBar, containerStyleBar)

// Escuta o scroll da página
const handleListnerEvent = () =>
  document.addEventListener('scroll', () => updateContextHeightStyleBar(styleBarElement, MAX_HEIGHT_WRAPPER));

// pega o width da style bar no localStorage
const getLocalStorageWidth = () => window.localStorage.getItem('widthStyleBar');

// interval animation de 0 até o width salvo no localStorage
const animationStatusBar = (current, hasWidthStyleBar, interval) => {
  styleBarElement.style.width = `${current}%`;
  if (current === Number(hasWidthStyleBar)) {
    clearInterval(interval);
  }
}

// verifica se existe um estado de width salvo no localStorage e aplica quando atualizar a página.
function isWidthState() {
  const hasWidthStyleBar = getLocalStorageWidth();
  let current = 0;
  if (hasWidthStyleBar) {
    const interval = setInterval(() => animationStatusBar(current++, hasWidthStyleBar, interval), 0.1);
    return handleListnerEvent();
  }
  return handleListnerEvent();
}

isWidthState();


/*
* element.offsetHeight => get MAX_SIZE of height container
* window.pageYOffset => get current scroll position
*/
