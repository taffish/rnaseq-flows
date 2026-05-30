# Contributing

Thank you for helping improve the TAFFISH RNA-seq flow documentation site.

This repository is a static user-facing portal. It is not itself a taf-flow app.
Executable flow code, tests, and release metadata live in the individual
`rnaseq-*-flow` repositories.

## What Belongs Here

- Flow-family overview and routing guidance.
- Per-flow user manuals.
- Input-preparation documentation.
- Report-interpretation documentation.
- Curated static example reports.
- Website source, assets, and GitHub Pages configuration.

Please do not add raw sequencing data, large reference databases, private
clinical data, credentials, or unpublished user project files.

## Local Preview

From the repository root:

```sh
python3 -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000/
```

## Static Checks

Run the bundled link checker before opening a pull request:

```sh
node scripts/check-links.js
```

The checker validates the curated site pages and intentionally skips generated
third-party report internals such as MultiQC or Qualimap HTML.

## Writing Style

- Keep TAFFISH framed as shell-native command-level reproducibility.
- Treat flows as composable executable packages, not as a replacement for
  Nextflow or Snakemake.
- Keep English and Chinese content aligned where the page is bilingual.
- Explain biological meaning, input shape, parameter choices, output files, and
  limitations together.
- Prefer stable links and avoid local machine paths.

## Updating the Yeast Example Reports

1. Regenerate the report with the intended `taf-rnaseq-standard-flow` release.
2. Replace the matching curated static output directory:
   - `examples/yeast-standard-report/`
   - `examples/yeast-denovo-standard-report/`
3. Keep these entry points present:
   - `examples/yeast-standard-report/index.html`
   - `examples/yeast-standard-report/04_reports/rnaseq_report.html`
   - `examples/yeast-standard-report/04_reports/report_interpretation.html`
   - `examples/yeast-denovo-standard-report/index.html`
   - `examples/yeast-denovo-standard-report/04_reports/rnaseq_report.html`
   - `examples/yeast-denovo-standard-report/04_reports/report_interpretation.html`
4. Re-run `node scripts/check-links.js`.
5. Check the report manually in a browser.

## Pull Requests

Pull requests should describe:

- what documentation or example content changed;
- whether any generated report artifacts were replaced;
- which local checks were run;
- whether links to individual flow repositories or manuals changed.
