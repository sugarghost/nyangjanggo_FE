let index = 0,
  isAdding = true,
  textToBeTypedIndex = 0;

export const typingAnimationHelper = (
  className: string,
  textToBeTypedArr: string[],
  time: number = 5000
) => {
  setTimeout(
    function() {
      const typeText = document.querySelector(`.${className}`) as HTMLElement;
      // set the text of typeText to a substring of the text to be typed using index.
      typeText.innerText = textToBeTypedArr[textToBeTypedIndex].slice(0, index);
      if (isAdding) {
        // adding text
        if (index > textToBeTypedArr[textToBeTypedIndex].length) {
          // no more text to add
          isAdding = false;
          //break: wait 2s before playing again
          setTimeout(function() {
            typingAnimationHelper(className, textToBeTypedArr);
          }, time);
          return;
        } else {
          // increment index by 1
          index++;
        }
      } else {
        // removing text
        if (index === 0) {
          // no more text to remove
          isAdding = true;
          //switch to next text in text array
          textToBeTypedIndex =
            (textToBeTypedIndex + 1) % textToBeTypedArr.length;
        } else {
          // decrement index by 1
          index--;
        }
      }
      // call itself
      typingAnimationHelper(className, textToBeTypedArr);
    },
    isAdding ? 120 : 60
  );
};
