import { FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";

/**
 * Component for displaying LLD interview question content and interactive demo
 */
const LLDContent = ({ darkMode, currentQuestion, activeCategory }) => {
  const [Component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);

  // GitHub repository URL for LLD components
  const githubRepoUrl =
    "https://github.com/MrGroot97/js_interview_prep/tree/main/src/components";

  // Dynamically load the component based on the current question
  useEffect(() => {
    setLoading(true);
    // Use dynamic import to load the component
    const importComponent = async () => {
      try {
        let componentModule;

        // Import the correct module based on the path
        switch (currentQuestion.componentPath) {
          case "typeAhead":
            componentModule = await import("../../components/typeAhead");
            setComponent(() => componentModule.default);
            break;
          case "tic-tac-toe":
            componentModule = await import("../../components/tic-tac-toe/TicTacToe");
            setComponent(() => componentModule.default);
            break;
          case "tabs":
            componentModule = await import("../../components/tabs/TabsDemo");
            setComponent(() => componentModule.default);
            break;
          case "currencyConverter":
            componentModule = await import("../../components/currencyConverter");
            setComponent(() => componentModule.CurrencyConverter);
            break;
          case "forwardRefComponent":
            componentModule = await import("../../components/forwardRefComponent");
            setComponent(() => componentModule.InputComponent);
            break;
          case "uberBoxSelector":
            componentModule = await import("../../components/uberBoxSelector");
            setComponent(() => componentModule.default);
            break;
          case "transferListMeta":
            componentModule = await import("../../components/transferListMeta");
            setComponent(() => componentModule.TransferList);
            break;
          case "atlassianChart":
            componentModule = await import("../../components/atlassianChart");
            setComponent(() => componentModule.AltassianChart);
            break;
          case "accordian":
            componentModule = await import("../../components/accordian");
            setComponent(() => componentModule.Accordian);
            break;
          case "countryGameMicrosoft":
            componentModule = await import("../../components/countryGameMicrosoft");
            setComponent(() => componentModule.default);
            break;
          case "popup":
            componentModule = await import("../../components/popup");
            setComponent(() => componentModule.PopupDemo);
            break;
          case "nestedComments":
            componentModule = await import("../../components/nestedComments");
            setComponent(() => componentModule.NestedComments);
            break;
          case "youtubeLiveStremChat":
            componentModule = await import("../../components/youtubeLiveStremChat");
            setComponent(() => componentModule.LiveStreamChat);
            break;
          case "infiniteScroll":
            componentModule = await import("../../components/infiniteScroll");
            setComponent(() => componentModule.InfiniteScroll);
            break;
          case "imageSlider":
            componentModule = await import("../../components/imageSlider");
            setComponent(() => componentModule.ImageSlider);
            break;
          case "confluenceTreeStructure":
            componentModule = await import("../../components/confluenceTreeStructure");
            setComponent(() => componentModule.ConfluenceTreeStructure);
            break;
          case "pagination":
            componentModule = await import("../../components/pagination");
            setComponent(() => componentModule.Pagination);
            break;
          case "stickyNotes":
            componentModule = await import("../../components/stickyNotes");
            setComponent(() => componentModule.StickyNote);
            break;
          case "signMaker":
            componentModule = await import("../../components/signMaker");
            setComponent(() => componentModule.default);
            break;
          default:
            console.error(`Component ${currentQuestion.componentName} not found`);
            setComponent(null);
        }
      } catch (error) {
        console.error("Error loading component:", error);
        setComponent(null);
      } finally {
        setLoading(false);
      }
    };

    importComponent();
  }, [currentQuestion]);

  return (
    <div className={`flex-1 overflow-y-auto ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="max-w-4xl mx-auto p-6 relative">
        {/* GitHub button */}
        <a
          href={`${githubRepoUrl}/${currentQuestion.componentPath}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`absolute top-6 right-6 flex items-center gap-2 px-3 py-2 rounded-md ${
            darkMode
              ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          } transition-colors`}
          title="View on GitHub"
        >
          <FaGithub size={20} />
          <span>GitHub</span>
        </a>

        <div className={`flex flex-col md:flex-row md:items-center mb-6 pb-4 border-b ${darkMode ? "border-gray-700" : "border-gray-300"}`}>
          <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
            {currentQuestion.title}
          </h1>
          <div className={`mt-2 md:mt-0 md:ml-3 px-3 py-1 rounded-full text-sm ${darkMode ? "bg-gray-700 text-blue-300" : "bg-blue-100 text-blue-600"}`}>
            {activeCategory}
          </div>
        </div>

        {currentQuestion.description && (
          <div className={`text-lg mb-8 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            {currentQuestion.description}
          </div>
        )}

        {/* Problem Statement */}
        {currentQuestion.problemStatement && (
          <div className="mb-8">
            <h2 className={`text-xl font-bold mb-3 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
              Problem Statement
            </h2>
            <div className={`p-4 border rounded-lg ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"}`}>
              <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                {currentQuestion.problemStatement}
              </p>
            </div>
          </div>
        )}

        {/* Requirements or Constraints */}
        {currentQuestion.requirements && currentQuestion.requirements.length > 0 && (
          <div className="mb-8">
            <h2 className={`text-xl font-bold mb-3 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
              Requirements
            </h2>
            <div className={`p-4 border rounded-lg ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"}`}>
              <ul className={`list-disc pl-5 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                {currentQuestion.requirements.map((req, index) => (
                  <li key={index} className="mb-1">{req}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Component Demo */}
        <div className="mb-8">
          <h2 className={`text-xl font-bold mb-3 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
            Interactive Demo
          </h2>
          <div className={`p-6 border rounded-lg ${darkMode ? "border-gray-700" : "border-gray-300"}`}>
            {loading ? (
              <div className={`text-center py-10 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mr-2"></div>
                <span>Loading component...</span>
              </div>
            ) : Component ? (
              <Component />
            ) : (
              <div className={`text-center py-10 ${darkMode ? "text-red-400" : "text-red-600"}`}>
                <p>Could not load the component. Please check the console for errors.</p>
              </div>
            )}
          </div>
        </div>

        {/* Key Takeaways */}
        {currentQuestion.keyTakeaways && currentQuestion.keyTakeaways.length > 0 && (
          <div className="mb-8">
            <h2 className={`text-xl font-bold mb-3 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
              Key Takeaways
            </h2>
            <div className={`p-4 border rounded-lg ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"}`}>
              <ul className={`list-disc pl-5 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                {currentQuestion.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="mb-1">{takeaway}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LLDContent;
