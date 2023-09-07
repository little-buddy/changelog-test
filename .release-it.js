const typeMap = {
  feat: "✨ Features",
  fix: "🐛 Bug Fixes",
  perf: "⚡ Performance Improvements",
  revert: "⏪ Reverts",
  docs: "📝 Documentation",
  style: "💄 Styles",
  refactor: "♻ Code Refactoring",
  test: "✅ Tests",
  build: "👷‍ Build System",
  ci: "🔧 Continuous Integration",
  chore: "🎫 Chores",
};

const createTypes = () => {
  const types = [];
  let i = 0;
  for (key in typeMap) {
    types.push({ type: key, section: typeMap[key], hidden: ++i > 4 });
  }
  return types;
};
const types = createTypes();

module.exports = {
  git: {
    commitMessage: "chore: release v${version}",
    tagName: "v${version}",
  },
  npm: {
    publish: false,
  },
  github: {
    release: true,
    releaseName: "v${version}",
    tokenRef: "GITHUB_TOKEN",
  },
  plugins: {
    "@release-it/conventional-changelog": {
      preset: {
        name: "conventionalcommits",
        types,
        preMajor: false,
      },
      infile: "CHANGELOG.md",
      header: "# Changelog",
      ignoreRecommendedBump: false,
      gitRawCommitsOpts: {
        format:
          "%B%n-hash-%n%H%n-gitTags-%n%d%n-committerDate-%n%ci%n-authorName-%n%an%n-authorEmail-%n%ae",
      },
    },

    // 'parserOpts': {
    //   mergePattern: '^Merge pull request #(\\d+) from (.*)$',
    // },
    // 'writerOpts': {
    //   groupBy: 'scope',
    // },
  },
};
