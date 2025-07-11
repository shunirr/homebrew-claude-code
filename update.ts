const CLAUDE_CODE_RELEASES =
  "https://registry.npmjs.org/@anthropic-ai/claude-code/latest";

const FORMULA_TEMPLATE = `# typed: false
# frozen_string_literal: true

require "language/node"

class ClaudeCode < Formula
  desc "Command line interface for Claude AI by Anthropic"
  homepage "https://www.anthropic.com"
  url "{{INSTALL_URL}}"
  version "{{VERSION}}"
  license "MIT"

  depends_on "node"

  def install
    system "npm", "install", *Language::Node.std_npm_install_args(libexec)
    bin.install_symlink Dir["#{libexec}/bin/*"]
  end

  test do
    assert_match "Usage", shell_output("#{bin}/claude-code --help")
  end
end
`;

async function getCurrentVersion(): Promise<string> {
  return (await Deno.readTextFile("current-version")).trim();
}

async function writeCurrentVersion(version: string) {
  await Deno.writeTextFile("current-version", version);
}

async function writeNewFormula(args: {
  installUrl: string;
  version: string;
}) {
  const formula = FORMULA_TEMPLATE.replaceAll("{{VERSION}}", args.version)
    .replaceAll("{{INSTALL_URL}}", args.installUrl);

  await Deno.writeTextFile("claude-code.rb", formula);
}

async function main() {
  const currentVersion = await getCurrentVersion();

  const json = await (await fetch(CLAUDE_CODE_RELEASES)).json();
  const newVersion = json.version;

  if (currentVersion === newVersion) {
    console.log("No update available");
    return;
  }

  console.log("Detect new version:" + newVersion);

  const installUrl = json.dist.tarball;

  if (!installUrl) {
    throw new Error("Failed to extract install URL");
  }

  const options = {
    installUrl,
    version: newVersion,
  };
  console.log("Write new formula: ", options);
  await writeNewFormula(options);
  await writeCurrentVersion(newVersion);
  console.log("Complete write new formula");
}

main();
