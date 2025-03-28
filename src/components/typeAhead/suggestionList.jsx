 
import clsx from "clsx";

export const SuggestionList = (props) => {
  const { suggestions, onSuggestionsSelect } = props;

  return (
    <div className="overflow-y-auto max-h-80 border border-stone-100 rounded-bl-md rounded-br-md shadow-md">
      {suggestions.slice(0,10).map((suggestion) => {
        return (
          <div
            key={suggestion.id}
            className={clsx("p-2 cursor-pointer")}
            onClick={() => onSuggestionsSelect(suggestion)}
          >
            {suggestion.title}
          </div>
        );
      })}
    </div>
  );
};
