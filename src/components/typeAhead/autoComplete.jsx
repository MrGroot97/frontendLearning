/* eslint-disable react/prop-types */
import clsx from "clsx";
import { useEffect, useState, useRef } from "react";
import { SuggestionList } from "./suggestionList";
import { debounce } from "./../../utils";


export const AutoComplete = (props) => {
  const {
    placeholder,
    customLoading = <div>Loading...</div>,
    fetchSuggestions,
    staticSuggestions = [],
    onChange,
    onSelect,
    onFocus,
    onBlur,
    customStyles,
  } = props;

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleFetchSuggestions = async (query) => {
    if(!query) return;
    setLoading(true);
    setError(null);
    if (staticSuggestions.length) {
      const data = staticSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(data);
      setLoading(false);
    } else {
      try {
        const data = await fetchSuggestions(query);
        setSuggestions(data);
      } catch (e) {
        console.error("error", e);
        setError("Error fetching suggestions");
      } finally {
        setLoading(false);
      }
    }
  };

  const debouncedFetchSuggestionsRef = useRef(debounce(handleFetchSuggestions, 1000));

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    onChange(value);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSuggestions([]);
      onBlur();
    }, 100);
  };

  const handleFocus = () => {
    handleFetchSuggestions(inputValue);
    onFocus();
  }

  const handleSelect = (suggestion) => {
    setInputValue(suggestion.title);
    setSuggestions([]);
    onSelect(suggestion);
  }

  useEffect(() => {
    debouncedFetchSuggestionsRef.current = debounce(handleFetchSuggestions, 1000);
  }, [fetchSuggestions, staticSuggestions]);

  useEffect(() => {
    debouncedFetchSuggestionsRef.current(inputValue);
  }, [inputValue]);

  return (
    <div className="flex flex-col max-w-xs">
      <input
        type="text"
        value={inputValue}
        className={clsx(
          "border border-black rounded-md pl-1",
          customStyles
        )}
        placeholder={placeholder}
        onChange={handleInputChange}
        // onSelect={handleSelect}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {loading && <div>{customLoading}</div>}
      {error && <div>{error}</div>}
      {suggestions.length > 0 && (
        <SuggestionList
          suggestions={suggestions}
          onSuggestionsSelect={handleSelect}
        />
      )}
    </div>
  );
};
