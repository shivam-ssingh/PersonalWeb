import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService, BlogMeta } from '../../services/content.service';

type Category = 'all' | 'tech' | 'sport' | 'reading' | 'general';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent implements OnInit {
  private contentService = inject(ContentService);

  allPosts = signal<BlogMeta[]>([]);
  activeCategory = signal<Category>('all');
  loading = signal(true);

  categories: { label: string; value: Category }[] = [
    { label: 'All', value: 'all' },
    { label: 'Tech', value: 'tech' },
    { label: 'Sport', value: 'sport' },
    { label: 'Reading', value: 'reading' },
    { label: 'General', value: 'general' },
  ];

  filteredPosts = computed(() => {
    const cat = this.activeCategory();
    const posts = this.allPosts();
    return cat === 'all' ? posts : posts.filter((p) => p.category === cat);
  });

  ngOnInit() {
    this.contentService.getBlogPosts().subscribe((posts) => {
      this.allPosts.set(posts);
      this.loading.set(false);
    });
  }

  setCategory(cat: Category) {
    this.activeCategory.set(cat);
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
